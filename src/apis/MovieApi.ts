import { MovieDetail, MoviesResponse } from "./apiTypes";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

type FetchParams = {
  language: "ko-KR";
  page?: string;
  query?: string;
  include_adult?: "false" | "true";
};

async function fetchWithErrorHandling(
  url: string,
  params: FetchParams
): Promise<MoviesResponse | MovieDetail> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };
  const queryParams = new URLSearchParams(params);

  return fetch(`${url}${queryParams.toString()}`, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(String(res.status));
  });
}

export async function fetchMovies({ page }: { page: number }) {
  const url = `${TMDB_BASE_URL}/movie/popular?`;
  return fetchWithErrorHandling(url, {
    language: "ko-KR",
    page: String(page),
  });
}

export async function fetchMovieByName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const url = `${TMDB_BASE_URL}/search/movie?`;
  return fetchWithErrorHandling(url, {
    query: name,
    include_adult: "false",
    language: "ko-KR",
    page: String(page),
  });
}

export async function fetchMovieDetail({ id }: { id: number }) {
  const url = `${TMDB_BASE_URL}/movie/${id}?`;
  return fetchWithErrorHandling(url, {
    language: "ko-KR",
  });
}
