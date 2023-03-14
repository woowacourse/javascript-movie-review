import { mostPopular } from "../fetch";

const movieHandler = {
  currentPageNumber: 1,

  async getPopularMovies() {
    const movies = await mostPopular(this.currentPageNumber);

    return movies.results;
  },
};

export default movieHandler;
