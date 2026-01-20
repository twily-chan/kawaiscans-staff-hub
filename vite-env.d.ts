// /// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_ADMIN_EMAILS: string;
    readonly VITE_GITHUB_TOKEN: string;
    readonly VITE_GITHUB_REPO: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  