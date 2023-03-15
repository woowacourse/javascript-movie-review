const API_KEY = process.env.API_KEY;

export const getPopularMovies = async (page) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  );

  return data.json();
};

export const getSearchMovies = async (query, page) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`
  );

  return data.json();
};
