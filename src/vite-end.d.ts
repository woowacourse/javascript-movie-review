interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_TMDB_IMG_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
