interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_ADMIN_EMAILS: string;
    readonly VITE_GITHUB_TOKEN: string;
    readonly VITE_GITHUB_REPO: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  