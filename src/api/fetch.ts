
import {MovieData} from "../../types/movieDataType";
import state from "../state/state";

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

export interface TMDBDetail {

}


export async function fetchPopularMovies(pageIndex:number) {
    const popularMovieUrl = `${import.meta.env.VITE_BASE_URL}movie/popular?language=ko-Kr&page=${pageIndex}`;
    return await fetchUtil(popularMovieUrl)
  }

export async function fetchSearchMovies(pageIndex:number) {
  const searchMovieUrl = `${import.meta.env.VITE_BASE_URL}search/movie?query=${state.searchKeyword}&include_adult=false&language=en-US&page=${pageIndex}`;
  return await fetchUtil(searchMovieUrl);
}

export async function fetchDetailMovie(movieId:string) {
  const detailMovie = `${import.meta.env.VITE_BASE_URL}movie/${movieId}?language=ko-Kr`
  return await fetchUtil(detailMovie)
}
  
async function fetchUtil(url: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        alert("페이지를 찾을 수 없습니다.");
      } else if (response.status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      throw new Error(data.message || "An error occurred");
    }

    return data;

  } catch (error) {
    throw error; 
  }
}
