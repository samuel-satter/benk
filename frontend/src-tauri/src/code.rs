use rand::Rng;
use uuid::Uuid;

fn generate_verification_code() -> String {
    let code = Uuid::new_v4().to_simple().to_string();
    code[..6].to_string()
}

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
        .await?;

    if response.status().is_success() {
        Ok(())
    } else {
        let error_message = response.text().await?;
        Err(BoxError { message: error_message} )
    }
}