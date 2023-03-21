const BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieAPIData {
  adult: boolean;
  backdrop_path: string;
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

export const popularMovieDataFetchFuncGenerator = () => {
  let currentPage = 1;

  const getPopularMovieData = async () => {
    const url = `
    ${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${currentPage}`;

    currentPage += 1;

    const data = await fetch(url);
    return data.json();
  };

  return getPopularMovieData;
};

export const searchedMovieDataFetchFuncGenerator = (query: string) => {
  let currentPage = 1;

  const getSearchedMovieData = async () => {
    const url = `
    ${BASE_URL}/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&page=${currentPage}&query=${query}`;

    currentPage += 1;

    const data = await fetch(url);

    return data.json();
  };

  return getSearchedMovieData;
};
