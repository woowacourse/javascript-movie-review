/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_TMDB_BEARER_TOKEN: string;
  // 필요한 다른 환경 변수가 있다면 추가
};

type ImportMetaEnv = {
  readonly env: ImportMetaEnv;
};
