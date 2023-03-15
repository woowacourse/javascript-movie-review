export const getPopularMovie = (page: number) => {
  let currentPage = page;

  return async function getCurrentMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${currentPage}`
    );
    const data = await response.json();
    currentPage += 1;

    return data.results;
  };
};
