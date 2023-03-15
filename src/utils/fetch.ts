export const getPopularMovies = async (page: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
