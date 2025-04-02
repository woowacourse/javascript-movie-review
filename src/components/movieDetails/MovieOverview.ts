interface MovieOverviewParams {
  overview: string;
}

class MovieOverview {
  #overview;

  constructor({ overview }: MovieOverviewParams) {
    this.#overview = overview;
  }

  create() {
    const overview = document.createElement("p");
    overview.classList.add("detail");
    overview.textContent = this.#overview;

    return overview;
  }
}

export default MovieOverview;
