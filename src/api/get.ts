export const popularMovieDataFetchFuncGenerator = () => {
  let currentPage = 1;

  const getPopularMovieData = async () => {
    const url = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`;

    currentPage += 1;

    const data = await fetch(url);

    return data.json();
  };

  return getPopularMovieData;
};
