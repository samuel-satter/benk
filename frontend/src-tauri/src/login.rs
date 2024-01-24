#[derive(Default)]
struct MyState {
  s: std::sync::Mutex<String>,
  t: std::sync::Mutex<std::collections::HashMap<String, String>>,
}
// remember to call `.manage(MyState::default())`
#[tauri::command]
async fn command_name(state: tauri::State<'_, MyState>) -> Result<(), String> {
  *state.s.lock().unwrap() = "new string".into();
  state.t.lock().unwrap().insert("key".into(), "value".into());
  Ok(())
}

fn login(email: String, password: String) -> Result<String, String> {
    Ok(format!("user successfully logged in with email: {}"), email)
}

fn create_account(email: String, password: String) -> Result<String, String> {
    Ok(format!("user successfully created account with email: {}"), email)
}