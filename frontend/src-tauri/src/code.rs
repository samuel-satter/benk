use std::env;

use rand::Rng;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::{errors::BoxError, user::User};

#[derive(Serialize)]
struct VerifyCodeRequest {
    email: String,
    code: String,
}

#[derive(Deserialize)]
struct VerifyCodeResponse {
    success: bool,
    message: String,
}

#[tauri::command]
pub async fn verify_code(email: String, code: String) -> Result<(), BoxError> {
    let client = Client::new();
    let url = format!("http://localhost:8080/user/verifyCode?email={}&code={}", email, code);

    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() })
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to verify code".to_string(),
        });
    }

    let response_body: VerifyCodeResponse = match response.json().await {
        Ok(body) => body,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if response_body.success {
        Ok(())
    } else {
        Err(BoxError { message: response_body.message })
    }
}

fn generate_verification_code() -> String {
    let code = Uuid::new_v4().simple().to_string();
    code[..6].to_string()
}

#[tauri::command]
pub async fn send_verification_code(email: String) -> Result<(), BoxError> {
    let client = Client::new();
    let verification_code = generate_verification_code();

    let user_url = format!("http://localhost:8080/user/findByEmail?email={}", email);
    let user: User = match client.get(&user_url).send().await {
        Ok(resp) => match resp.json().await {
            Ok(u) => u,
            Err(e) => return Err(BoxError { message: e.to_string() }),
        },
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    send_email(&user.email, &verification_code).await?;

    Ok(())
}

async fn send_email(email: &str, verification_code: &str) -> Result<(), BoxError> {
    let client = Client::new();
    let api_url = "https://api.testmail.app/v1/email";
    let token = env::var("TESTMAIL_APP_TOKEN").expect("TESTMAIL_APP_TOKEN must be set");

    let headers = {
        let mut headers = reqwest::header::HeaderMap::new();
        headers.insert("Authorization", format!("Bearer {}", token).parse().unwrap());
        headers.insert("Content-Type", "application/json".parse().unwrap());
        headers
    };

    let body = json!({
        "to": email,
        "subject": "Password Reset Verification Code",
        "text": format!("Your verification code is: {}", verification_code)
    });

    let response = client.post(api_url)
        .headers(headers)
        .json(&body)
        .send()
        .await;
    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                Ok(())
            } else {
                let error_message = resp.text().await.map_err(|e| BoxError { message: e.to_string() })?;
                Err(BoxError { message: error_message })
            }
        },
        Err(e) => Err(BoxError { message: e.to_string() }),
    }
}