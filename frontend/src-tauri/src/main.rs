// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod user;
mod login;
mod errors;
mod code;

use tauri_plugin_log::LogTarget;
use user::{get_all_users, get_user, save_user};
use login::login;
use login::is_admin;
use user::change_user_pwd;
use code::{send_verification_code, verify_code};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
    .plugin(tauri_plugin_log::Builder::default().targets([
        LogTarget::LogDir,
        LogTarget::Stdout,
        LogTarget::Webview,
    ]).build())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_all_users,
            get_user,
            save_user,
            is_admin,
            login,
            change_user_pwd,
            send_verification_code,
            verify_code
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

