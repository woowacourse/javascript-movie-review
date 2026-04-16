class MovieItem {
  #thumbnailList: HTMLElement;
  #onClickMovie: (movieId: string) => void;

  constructor(onClickMovie: (movieId: string) => void) {
    const thumbnailList =
      document.querySelector<HTMLElement>(".thumbnail-list");

    if (!thumbnailList) {
      throw new Error("thumbnail-list 요소를 찾을 수 없습니다.");
    }

    this.#thumbnailList = thumbnailList;
    this.#onClickMovie = onClickMovie;
  }

  bindEvent() {
    this.#thumbnailList.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const movieItem = target.closest(".item");

      if (!(movieItem instanceof HTMLElement)) {
        return;
      }

      this.handleClick(movieItem);
    });
  }

  handleClick(movieItem: HTMLElement) {
    const movieId = movieItem.dataset.movieId;

    if (!movieId) {
      console.warn("movieId를 찾을 수 없습니다.", movieItem.dataset);
      return;
    }

    this.#onClickMovie(movieId);
  }
}

export default MovieItem;
