export const getPopularMovie = () => {
  let currentPage = 1;

  return async function getCurrentMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${currentPage}`
      );
      const data = await response.json();
      currentPage += 1;
      const a = { data, currentPage };
      return a;
    } catch (e) {
      console.log(e);
    }
  };
};
