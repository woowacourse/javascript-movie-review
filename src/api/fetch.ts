/// <reference types="vite/client" />
import {MovieData} from "../../types/movieDataType";

export interface ImportMetaEnv {
    readonly VITE_TMDB_TOKEN: string;
  }
  
export interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  

export interface TMDBResponse {
    page: number;
    results: MovieData[];
    total_pages: number;
    total_results: number;
  }


export async function fetchPopularMovies(pageIndex:number) {
    const popularMovieUrl = `${import.meta.env.VITE_BASE_URL}movie/popular?language=ko-Kr&page=${pageIndex}`;
    return await fetchUtil(popularMovieUrl)
  }

export async function fetchSearchMovies(searchKeyword: string, pageIndex:number) {
  const searchMovieUrl = `${import.meta.env.VITE_BASE_URL}search/movie?query=${searchKeyword}&include_adult=false&language=en-US&page=${pageIndex}`;
  return await fetchUtil(searchMovieUrl);
}
  
async function fetchUtil(url: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = await fetch(url, options);

  if(!response.ok){
    alert("서버와의 연결이 끊어졌습니다")
  }


  const {results, total_pages} = (await response.json()) as TMDBResponse;
  return {results, total_pages};
}