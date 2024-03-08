use serde::{Serialize, Deserialize};
use crate::errors::BoxError;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub id: u64,
    pub is_admin: bool,
    pub first_name: String,
    pub last_name: String,
    pub pwd: String,
    pub email: String,
    pub phone_number: String,
    pub origin: String,
    pub account_number: String,
    pub balance: f64,
    pub status: bool,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[tauri::command]
pub async fn get_all_users() -> Result<Vec<User>, BoxError> {
    let client = reqwest::Client::new();
    let url = "http://localhost:8080/user/findAll";

    let response = match client.get(url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to retrieve users".to_string(),
        });
    }

    let users: Vec<User> = match response.json().await {
        Ok(u) => u,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(users)
}

#[tauri::command]
pub async fn get_user(user_id: u64) -> Result<User, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/{}", user_id);
    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to retrieve user".to_string(),
        });
    }

    let user: User = match response.json().await {
        Ok(u) => u,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(user)
}

#[tauri::command]
pub async fn get_top_users() -> Result<Vec<User>, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/get-top-users");
    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

     if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to retrieve user".to_string(),
        });
    }

    let users: Vec<User> = match response.json().await {
        Ok(u) => u,
        Err(e) => return Err(BoxError { message: e.to_string() })
    };

    Ok(users)
}

#[tauri::command]
pub async fn save_user(user: User) -> Result<User, BoxError> {
    let client = reqwest::Client::new();
    let url = "http://localhost:8080/user/save";
    let response = match client.post(url).json(&user).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to save user".to_string(),
        });
    }

    let saved_user: User = match response.json().await {
        Ok(u) => u,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(saved_user)
}

#[tauri::command]
pub async fn change_user_pwd(pwd: String, user: User) -> Result<User, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/pwd/{}", user.id);
    let response = match client.put(&url).json(&pwd).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to change user password".to_string(),
        });
    }

    let updated_user: User = match response.json().await {
        Ok(u) => u, 
        Err(e) => return Err(BoxError {message: e.to_string() }),
    };

    Ok(updated_user)
    
}

#[tauri::command]
pub async fn get_user_growth() -> Result<i32, BoxError> {
    let client = reqwest::Client::new();
    let url = "http://localhost:8080/user/user-growth";
    let response = match client.get(url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to retrieve user growth".to_string(),
        });
    }

    let growth: i32 = match response.json().await {
        Ok(g) => g,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(growth)
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockito::Server;
    use serde_json::json;

    fn setup_mock_server() -> mockito::ServerGuard {
        let mut server = Server::new();

        let _m1 = server.mock("GET", "/user/findAll")
            .with_status(200)
            .with_body(json!([{
                "id": 1,
                "is_admin": false,
                "first_name": "John",
                "last_name": "Doe",
                "pwd": "password",
                "email": "john.doe@example.com",
                "phone_number": "1234567890",
                "origin": "USA",
                "account_number": "123456",
                "balance": 1000.0,
                "status": true,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }]).to_string())
            .create();

        let _m2 = server.mock("GET", "/user/{id}")
            .with_status(200)
            .with_body(json!({
                "id": 1,
                "is_admin": false,
                "first_name": "John",
                "last_name": "Doe",
                "pwd": "password",
                "email": "john.doe@example.com",
                "phone_number": "1234567890",
                "origin": "USA",
                "account_number": "123456",
                "balance": 1000.0,
                "status": true,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }).to_string())
            .create();

        let _m3 = server.mock("POST", "/user/save")
            .with_status(200)
            .with_body(json!({
                "id": 1,
                "is_admin": false,
                "first_name": "John",
                "last_name": "Doe",
                "pwd": "password",
                "email": "john.doe@example.com",
                "phone_number": "1234567890",
                "origin": "USA",
                "account_number": "123456",
                "balance": 1000.0,
                "status": true,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }).to_string())
            .create();

        let _m4 = server.mock("PUT", "/user/pwd/{id}")
            .with_status(200)
            .with_body(json!({
                "id": 1,
                "is_admin": false,
                "first_name": "John",
                "last_name": "Doe",
                "pwd": "new_password",
                "email": "john.doe@example.com",
                "phone_number": "1234567890",
                "origin": "USA",
                "account_number": "123456",
                "balance": 1000.0,
                "status": true,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }).to_string())
            .create();

        server
    }

    #[tokio::test]
    async fn test_get_all_users() {
        let mut server = setup_mock_server();

        let result = get_all_users().await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap().len(), 1);


        server.mock("GET", "/user/findAll").assert();
    }

    #[tokio::test]
    async fn test_get_user() {
        let mut server = setup_mock_server();
        let user_id = 1;

        let result = get_user(user_id).await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap().id, user_id);


        server.mock("GET", format!("/user/{}", user_id).as_str()).assert();
    }

    #[tokio::test]
    async fn test_save_user() {
        let mut server = setup_mock_server();
        let user = User {
            id: 1,
            is_admin: false,
            first_name: "John".to_string(),
            last_name: "Doe".to_string(),
            pwd: "password".to_string(),
            email: "john.doe@example.com".to_string(),
            phone_number: "1234567890".to_string(),
            origin: "USA".to_string(),
            account_number: "123456".to_string(),
            balance: 1000.0,
            status: true,
            created_at: Some("2023-01-01T00:00:00Z".to_string()),
            updated_at: Some("2023-01-01T00:00:00Z".to_string()),
        };


        let result = save_user(user.clone()).await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap().id, user.id);


        server.mock("POST", "/user/save").assert();
    }

    #[tokio::test]
    async fn test_change_user_pwd() {
        let mut server = setup_mock_server();
        let user = User {
            id: 1,
            is_admin: false,
            first_name: "John".to_string(),
            last_name: "Doe".to_string(),
            pwd: "password".to_string(),
            email: "john.doe@example.com".to_string(),
            phone_number: "1234567890".to_string(),
            origin: "USA".to_string(),
            account_number: "123456".to_string(),
            balance: 1000.0,
            status: true,
            created_at: Some("2023-01-01T00:00:00Z".to_string()),
            updated_at: Some("2023-01-01T00:00:00Z".to_string()),
        };
        let new_pwd = "new_password".to_string();


        let result = change_user_pwd(new_pwd, user.clone()).await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap().pwd, "new_password");


        server.mock("PUT", format!("/user/pwd/{}", user.id).as_str()).assert();
    }
}
