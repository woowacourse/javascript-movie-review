interface ImportMetaEnv {
  readonly VITE_TMDB_API_TOKEN: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
