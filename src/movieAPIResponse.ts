export interface MoviePage {
  results: import('../types/Movie.ts').Movie[];
  totalPages: number;
}

const defaultOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
};

const get = async (url: string, errorMessage: string, signal?: AbortSignal) => {
  const response = await fetch(url, { ...defaultOptions, signal });
  if (!response.ok)
    throw new Error(`[ERROR] ${response.status} ${response.statusText} - ${errorMessage}`);
  return response.json();
};

const apiFetch = async (url: string, errorMessage: string, signal?: AbortSignal): Promise<MoviePage> => {
  const json = await get(url, errorMessage, signal);
  return { results: json.results, totalPages: json.total_pages };
};

export const fetchMovies = (page: number, signal?: AbortSignal) => {
  const popularMoviesUrl = new URL('https://api.themoviedb.org/3/movie/popular');
  popularMoviesUrl.searchParams.set('language', 'en-US');
  popularMoviesUrl.searchParams.set('page', String(page));
  return apiFetch(popularMoviesUrl.href, '인기 영화 불러오기에 실패하였습니다.', signal);
};

export const fetchSearchedMovies = (keyword: string, page: number, signal?: AbortSignal) => {
  const searchMoviesUrl = new URL('https://api.themoviedb.org/3/search/movie');
  searchMoviesUrl.searchParams.set('query', keyword);
  searchMoviesUrl.searchParams.set('language', 'en-US');
  searchMoviesUrl.searchParams.set('page', String(page));
  return apiFetch(searchMoviesUrl.href, '검색 영화 불러오기에 실패하였습니다.', signal);
};

export const fetchMovieDetail = async (id: number, signal?: AbortSignal): Promise<import('../types/MovieDetail.ts').MovieDetail> => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  url.searchParams.set('language', 'en-US');
  const json = await get(url.href, '영화 상세 정보 불러오기에 실패하였습니다.', signal);
  return {
    id: json.id,
    title: json.title,
    poster_path: json.poster_path,
    // vote_average: json.vote_average,
    overview: json.overview,
    release_date: json.release_date,
    genres: json.genres,
  };
};
