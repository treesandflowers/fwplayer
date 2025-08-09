use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

use crate::player::load_video::load_video;

#[tauri::command]
pub fn select_file(app: AppHandle) {
    let file = app.dialog().file().blocking_pick_file();

    match file {
        Some(file) => load_video(app, file),
        None => {
            println!("No file selected");
        }
    }
}
