import { Movie } from "../types/movie";

class TopRatedMovie {
  private static IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  #movie: Movie;

  constructor(movie: Movie) {
    this.#movie = movie;
  }

  public get skeleton() {
    return /*html*/ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-movie">
          <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${this.#movie.vote_average}</span>
          </div>
          <div class="title">${this.#movie.title}</div>
          <button class="primary detail">자세히 보기</button>
      </div>
    </div>
    `;
  }

  public get ui() {
    return /*html*/ `
    <div class="background-container" style="background-image: url(${
      TopRatedMovie.IMAGE_BASE_URL
    }${this.#movie.poster_path})">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-movie">
        <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">${this.#movie.vote_average}</span>
        </div>
        <div class="title">${this.#movie.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
    `;
  }
}

export default TopRatedMovie;
