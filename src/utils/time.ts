export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const to_progress_percent = (
  current_seconds: number,
  duration_seconds: number
): number => {
  if (!Number.isFinite(duration_seconds) || duration_seconds <= 0) return 0;
  return clamp((current_seconds / duration_seconds) * 100, 0, 100);
};

export type TimeParts = {
  hour: string;
  minute: string;
  second: string;
};

export const format_time = (total_seconds: number): TimeParts => {
  const seconds = clamp(Math.floor(total_seconds), 0, Number.MAX_SAFE_INTEGER);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    hour: String(h).padStart(2, "0"),
    minute: String(m).padStart(2, "0"),
    second: String(s).padStart(2, "0"),
  };
};


