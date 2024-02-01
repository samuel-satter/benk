// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod user;

use serde::Serialize;
use user::User;



#[derive(Serialize)]
struct BoxError {
    message: String,
}

impl From<Box<dyn std::error::Error>> for BoxError {
    fn from(err: Box<dyn std::error::Error>) -> Self {
        BoxError {
            message: err.to_string(),
        }
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_all_users() -> Result<Vec<User>, BoxError> {
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
async fn get_user(user_id: u64) -> Result<User, BoxError> {
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
async fn save_user(user: User) -> Result<User, BoxError> {
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
async fn is_admin(user_id: u64) -> Result<bool, BoxError> {
    let client = reqwest::Client::new();
    let url = format!("http://localhost:8080/user/isAdmin/{}", user_id);
    let response = match client.get(&url).send().await {
        Ok(resp) => resp,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    if !response.status().is_success() {
        return Err(BoxError {
            message: "Failed to check if user is admin".to_string(),
        });
    }

    let is_admin: bool = match response.json().await {
        Ok(u) => u,
        Err(e) => return Err(BoxError { message: e.to_string() }),
    };

    Ok(is_admin)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_all_users,
            get_user,
            save_user,
            is_admin
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

