const detailOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

class MovieDetailStore {
  #movieId: number = 0;

  constructor() {
    this.#movieId = 634492;
  }

  async #fetchMovieDetail() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.#movieId}?language=ko`, detailOptions);
    const responseJson = response.json();

    return responseJson;
  }

  get detail() {
    return this.#fetchMovieDetail();
  }
}

const movieDetailStore = new MovieDetailStore();

export default movieDetailStore;
