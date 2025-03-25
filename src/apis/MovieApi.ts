const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface MoviesResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

async function fetchWithErrorHandling(url: string): Promise<MoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  return fetch(url, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(String(res.status));
  });
}

export async function getMovies({ page }: { page: number }) {
  const params = new URLSearchParams({
    language: "ko-KR",
    page: String(page),
  });

  const url = `${TMDB_BASE_URL}/movie/popular?${params.toString()}`;
  return fetchWithErrorHandling(url);
}

export async function getMovieByName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const params = new URLSearchParams({
    query: name,
    include_adult: "false",
    language: "ko-KR",
    page: String(page),
  });

  const url = `${TMDB_BASE_URL}/search/movie?${params.toString()}`;
  return fetchWithErrorHandling(url);
}
