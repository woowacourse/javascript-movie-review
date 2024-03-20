declare module '*.css';
declare module '*.png';

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    BASE_URL: string;
    IMAGE_BASE_URL: string;
  }
}
