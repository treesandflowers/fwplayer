pub mod player {
    pub mod load_video;
    pub mod state;
}

pub mod commands {
    pub mod file_selector;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::file_selector::select_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
