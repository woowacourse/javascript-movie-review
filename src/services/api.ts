import { apiUrl, apiKey } from "../constants/env";
import { Movie, Movies } from "./dto";

export class ApiError extends Error {
  status_code: number;

  constructor(message: string, status_code: number) {
    super(message);
    this.name = "ApiError";
    this.status_code = status_code;
  }
}

const fromMovieDto = (movie: Movie) => {
  if(!movie.title) return null;

  return {
    ...movie,
    poster_path: typeof movie.poster_path === 'string' ? movie.poster_path: null
  }
}

export const getMoviePopular = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  const url = `${apiUrl}/movie/popular?page=${page}`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) {
    const data =  await res.json();
    return {
      ...data,
      results: data.results.map(fromMovieDto).filter((movie: Movie | null): movie is Movie => movie !== null)
    }
  }

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};

export const getTopRatedMovie = async () => {
  const url = `${apiUrl}/movie/top_rated`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return await res.json();
};

export const getSearchMovie = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<Movies> => {
  const url = `${apiUrl}/search/movie?page=${page}&query=${query}`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return await res.json();
};
