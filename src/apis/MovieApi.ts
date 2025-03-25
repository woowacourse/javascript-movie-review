import { MoviesResponse } from "../../types";

async function fetchWithErrorHandling(url: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(response);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            error: "검색 가능한 페이지 수를 넘겼습니다.",
          };
        case 401:
          return {
            error: "사용자 인증 정보가 잘못되었습니다.",
          };
        default:
          return {
            error: `에러가 발생했습니다. (${response.status})`,
          };
      }
    }

    return response.json() as unknown as MoviesResponse;
  } catch (error) {
    return {
      error: `에러가 발생했습니다. ${error}`,
    };
  }
}

interface GetDataProps {
  page: number;
  name: string;
}

export async function getMovies({ page }: Omit<GetDataProps, "name">) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}

export async function getMovieByName({ name, page }: GetDataProps) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}
