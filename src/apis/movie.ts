const BASE_URL = 'https://api.themoviedb.org';

export const getPopularMovies = async (page: number) => {
  const response = await fetch(BASE_URL + `/3/movie/popular?language=en-US&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const searchMoviesBytitle = async (title: string, page: number) => {
  const response = await fetch(
    BASE_URL + `/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
  );
  const data = await response.json();
  return data.results;
};
