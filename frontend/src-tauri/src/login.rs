use serde::Serialize;

use crate::errors::BoxError;

#[derive(Serialize)]
struct MyState {
  s: std::sync::Mutex<String>,
  t: std::sync::Mutex<std::collections::HashMap<String, String>>,
}

#[derive(Serialize)]
struct LoginDTO {
  email: String,
  password: String,
}

// remember to call `.manage(MyState::default())` please :praying_hands: :100: 
#[tauri::command]
async fn command_name(state: tauri::State<'_, MyState>) -> Result<(), String> {
  *state.s.lock().unwrap() = "new string".into();
  state.t.lock().unwrap().insert("key".into(), "value".into());
  Ok(())
}

#[tauri::command]
pub async fn login(email: String, password: String) -> Result<String, BoxError> {
    let client = reqwest::Client::new();
    let auth_url = "http://localhost:8080/jwt/authenticate";
    
    let login_dto = LoginDTO{
        email,
        password,
    };
    
    let response = match client.post(auth_url).json(&login_dto).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError {
            message: e.to_string()
        })
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to authenticate".to_string(),
        });
    }

    let jwt: String = match response.text().await {
        Ok(text) => text,
        Err(e) => return Err(BoxError {  
            message: e.to_string()
        })
    };

  Ok(jwt)
}

#[tauri::command]
pub async fn is_admin(email: String) -> Result<bool, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/{}/isAdmin", email);
    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    println!("Response status: {}", &response.status());
  

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to check if user is admin".to_string(),
        });
    }

    let is_admin: bool = match response.json().await {
        Ok(u) => {
          println!("response body {:?}", u);
          u
        },

        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(is_admin)
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockito::Server;
    use serde_json::json;

    fn setup_mock_server() -> mockito::ServerGuard {
        let mut server = Server::new();

        let _m1 = server.mock("POST", "/jwt/authenticate")
            .with_status(200)
            .with_body("mock_jwt_token")
            .create();
        let _m2 = server.mock("GET", "/user/{email}/isAdmin")
            .with_status(200)
            .with_body(json!({ "isAdmin": true }).to_string())
            .create();

        server
    }

    #[tokio::test]
    async fn test_login() {
        let mut server = setup_mock_server();
        let email = "test@exampel.com".to_string();
        let password = "password123".to_string();

        let result = login(email, password).await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), "mock_jwt_token");

        server.mock("POST", "/jwt/authenticate").assert();
    }

    #[tokio::test]
    async fn test_is_admin() {
        let mut server = setup_mock_server();
        let email = "test@example.com".to_string();

        let result = is_admin(email).await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), true);
        
        server.mock("GET", "/user/test@example.com/isAdmin").assert();
    }
}