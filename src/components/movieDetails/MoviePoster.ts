interface MoviePosterParams {
  posterPath: string;
  title: string;
}

class MoviePoster {
  #posterPath;
  #title;

  constructor({ posterPath, title }: MoviePosterParams) {
    this.#posterPath = posterPath;
    this.#title = title;
  }

  create() {
    const poster = document.createElement("div");
    poster.classList.add("modal-image");

    const posterImage = document.createElement("img");
    posterImage.src = this.#posterPath;
    posterImage.alt = this.#title;

    poster.appendChild(posterImage);
    return poster;
  }
}

export default MoviePoster;
