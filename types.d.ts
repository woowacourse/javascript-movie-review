declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TMDB_API_KEY: string;
    }
  }
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.svg';
}

export {};
