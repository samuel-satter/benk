use serde::{Serialize, Deserialize};
use crate::errors::BoxError;

#[derive(Debug, Serialize, Deserialize)]
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
