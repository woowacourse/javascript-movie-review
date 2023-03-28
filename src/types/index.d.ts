declare module '*.png';
declare module '*.svg';

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
