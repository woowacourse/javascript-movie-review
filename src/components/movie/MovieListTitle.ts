class MovieListTitle {
  #element: HTMLElement;

  constructor(text: string) {
    this.#element = this.#makeMovieListTitle(text);
  }

  get element() {
    return this.#element;
  }

  #makeMovieListTitle = (text: string) => {
    const $title = document.createElement('h2');
    $title.textContent = text;

    return $title;
  };
}

export default MovieListTitle;
