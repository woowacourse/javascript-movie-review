interface MovieInfo {
  userRating: number;
}

class StorageInterface {
  #storage = localStorage;

  getMovieInfo(movieId: string) {
    const movieInfos = this.#getMovieInfos();

    return movieInfos[movieId];
  }

  setMovieInfo(movieId: string, movieInfo: MovieInfo) {
    const movieInfos = this.#getMovieInfos();

    movieInfos[movieId] = movieInfo;
    this.#storage.setItem("movieInfos", JSON.stringify(movieInfos));
  }

  #getMovieInfos() {
    return JSON.parse(this.#storage.getItem("movieInfos") ?? "{}");
  }
}

export default StorageInterface;
