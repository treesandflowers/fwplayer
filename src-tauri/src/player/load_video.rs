use tauri::AppHandle;
use tauri::Emitter;
use tauri_plugin_dialog::FilePath;

pub fn load_video(app: AppHandle, path: FilePath) {
    let p = match path {
        FilePath::Path(pb) => pb.to_string_lossy().into_owned(),
        FilePath::Url(u) => u.to_string(),
    };

    let _ = app.emit("video_selected", p);
}
