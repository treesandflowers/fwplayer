// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    ffmpeg_next::init().unwrap();
    fwplayer_lib::run()
}
