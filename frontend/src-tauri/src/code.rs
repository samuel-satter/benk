use std::env;

use reqwest::Client;
use sendgrid::{v3::{Content, Email, Message}, Destination, Mail, SGClient};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::errors::BoxError;

#[derive(Serialize)]
struct VerifyCodeRequest {
    email: String,
    code: String,
}

#[derive(Serialize, Deserialize)]
pub struct VerifyCodeResponse {
    success: bool,
    message: String,
}

#[tauri::command]
pub async fn verify_code(email: String, code: String) -> Result<VerifyCodeResponse, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/verify-code");
    let request_body = VerifyCodeRequest { email, code };

    let response = match client.post(&url).json(&request_body).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
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

    Ok(response_body)
}

fn generate_verification_code() -> String {
    let code = Uuid::new_v4().simple().to_string();
    code[..6].to_string()
}

#[tauri::command]
pub async fn send_verification_code(email: String) -> Result<(), BoxError> {
    let client = Client::new();
    let verification_code = generate_verification_code();

    let save_code_url = format!("http://localhost:8080/user/findByEmail?email={}", email);
    let save_code_response = client.post(&save_code_url)
        .json(&email)
        .send()
        .await;
    if save_code_response.is_err() {
        return Err(BoxError { message: "Failed to save verification code".to_string() });
    }

    send_email(&email, &verification_code).await?;

    Ok(()) 
}

async fn send_email(email: &str, verification_code: &str) -> Result<(), BoxError> {
    let api_key = dotenv::var("SG_MAIL_TOKEN").expect("Environment token must be set");
    let subject = "Password Reset Verification Code";
    let text = format!("Your verification code is: {}", verification_code);
    let body = format!("<p>{}</p>", text);

    let mail = Mail::new()
    .add_from("benk.app@outlook.com")
        .add_from_name("benk")
        .add_to(Destination {
            address: email,
            name: "", 
        })
        .add_subject(subject)
        .add_text(&text)
        .add_html(&body);

    let client = SGClient::new(api_key);

    let response = client.send(mail).await;

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