const API_KEY = process.env.API_KEY;

export const getPopularMovies = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  );

  if (!response.ok) throw new Error('인기 영화 불러오기 실패');

  return response.json();
};

export const getSearchMovies = async (query, page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`
  );

  if (!response.ok) throw new Error('검색된 영화 불러오기 실패');

  return response.json();
};
