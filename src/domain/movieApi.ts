export const movieApi = {
  async fetchMovieInfo() {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=1`
    );
    let data = await response.json();
    return data;
  },
};
