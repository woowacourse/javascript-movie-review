/// <reference types="vite/client" />
import MovieList from "../component/common/MovieList.js";

export interface ImportMetaEnv {
    readonly VITE_TMDB_TOKEN: string;
  }
  
export interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  

export interface TMDBResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }
  
  export interface Result {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }


export async function fetchPopularMovies() {
    const popularMovieUrl = "https://api.themoviedb.org/3/movie/popular?language=ko-Kr&page=1";
    const options = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };
  
    const response = await fetch(popularMovieUrl, options);
    const { results } = (await response.json()) as TMDBResponse;
    return results;
  }
  
  export async function loadPopularMovies() {
    const popularMovies = await fetchPopularMovies();
    MovieList(popularMovies).createList();
  }