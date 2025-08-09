use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct State {
    pub playing: bool,
    pub file: String,
    pub video: Video,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Video {
    pub current_time: f64,
    pub duration: f64,
}
