import { APIData } from "../types/apiData";
import { Movie } from "../types/movie";
import Skeleton from "./Skeleton";

type Status = "loading" | "success";

interface TopRatedMovieContract {
  render({ status, movie }: { status: Status; movie?: Movie }): void;
}

class TopRatedMovie implements TopRatedMovieContract {
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";
  #parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
  }

  render(response: APIData<Movie>) {
    if (response.status === "loading") {
      this.#parentElement.innerHTML = /*html*/ `${Skeleton.TopRatedMovie}`;
      return;
    }

    if (!response.data) return;

    this.#parentElement.innerHTML = /*html*/ `
    <div class="background-container" style="background-image: url(${TopRatedMovie.IMAGE_BASE_URL}${response.data.poster_path})">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-movie">
        <div class="rate">
            <img src="./images/star_empty.png" class="star" alt="star-empty" />
            <span class="rate-value">${response.data.vote_average}</span>
        </div>
        <div class="title">${response.data.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
    `;
  }
}

export default TopRatedMovie;
