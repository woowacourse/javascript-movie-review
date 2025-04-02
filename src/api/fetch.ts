/// <reference types="vite/client" />
import state from "../state/state";

export async function fetchPopularMovies(pageIndex: number) {
  const popularMovieUrl = `${import.meta.env.VITE_BASE_URL}movie/popular?language=ko-Kr&page=${pageIndex}`;
  return await fetchUtil(popularMovieUrl, "GET");
}

export async function fetchSearchMovies(pageIndex: number) {
  const searchMovieUrl = `${import.meta.env.VITE_BASE_URL}search/movie?query=${state.searchKeyword}&include_adult=false&language=en-US&page=${pageIndex}`;
  return await fetchUtil(searchMovieUrl, "GET");
}

export async function fetchDetailMovie(movieId: string) {
  const detailMovie = `${import.meta.env.VITE_BASE_URL}movie/${movieId}?language=ko-Kr`;
  return await fetchUtil(detailMovie, "GET");
}

async function fetchUtil(url: string, method: string, body?: object) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      handleErrorResponse(response.status);
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function handleErrorResponse(status: number) {
  if (status === 404) {
    alert("페이지를 찾을 수 없습니다.");
  } else if (status === 500) {
    alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}
