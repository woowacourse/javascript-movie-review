const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovie = async (currentPage: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${currentPage}`
    );
    const data = await response.json();
    currentPage++;
    const popularMovieData = { data, currentPage };
    return popularMovieData;
  } catch (e) {
    console.log(e);
  }
};
