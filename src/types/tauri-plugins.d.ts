declare module "@tauri-apps/plugin-dialog" {
  export function open(options?: {
    multiple?: boolean;
    directory?: boolean;
    filters?: Array<{ name: string; extensions: string[] }>;
  }): Promise<string | string[] | null>;
}

