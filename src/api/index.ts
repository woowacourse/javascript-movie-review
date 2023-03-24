import { TMDBClient } from './clients/TMDBClient';
import { TMDBLanguage } from './clients/TMDBClient.type';

export const api = new TMDBClient({
  apiKey: process.env.TMDB_API_KEY!,
  language: navigator.language as TMDBLanguage,
});
