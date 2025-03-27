import { MovieResult } from "../../api/types/movie/response";
import { PREFIX_POSTER_PATH } from "../../constants/constants";
import Component from "../base/Component";
import Skeleton from "../common/Skeleton";

const SKELETON_COUNT = 20;

interface MainState {
  movies: MovieResult[];
  isLoading: boolean;
  title: string;
  error: string | null;
}

export default class Main extends Component<MainState> {
  private static instance: Main;

  protected constructor() {
    super({
      movies: [],
      isLoading: true,
      title: "지금 인기 있는 영화",
      error: null,
    });
  }

  protected createElement(): HTMLElement {
    return document.createElement("main");
  }

  static getInstance(): Main {
    if (!Main.instance) Main.instance = new Main();
    return Main.instance;
  }

  private renderSkeletonItem() {
    return /*html*/ `
      <li>
        <div class="item">
          ${Skeleton({ width: 200, height: 300 }).outerHTML}
          <div class="item-desc">
            ${Skeleton({ width: 60, height: 15 }).outerHTML}
            ${Skeleton({ width: 150, height: 20 }).outerHTML}
          </div> 
        </div> 
      </li>
    `;
  }

  private renderMovieItem(movie: MovieResult) {
    const posterImage = movie.poster_path
      ? `${PREFIX_POSTER_PATH}${movie.poster_path}`
      : "./images/default_thumbnail.jpeg";

    return /*html*/ `
      <li>
        <div class="item" data-movie-id="${movie.id}">
          <img
            class="thumbnail"
            src="${posterImage}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate loading">
              <img src="./images/star_empty.png" class="star" alt="star_empty" /><span
                >${movie.vote_average}</span
              >
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </li>
    `;
  }

  protected template(): string {
    return /*html*/ `
      <section>
        <h2 class="thumbnail-title">${this.state.title}</h2>
        ${
          !this.state.error
            ? /*html*/ `
          <ul class="thumbnail-list">
          ${
            this.state.isLoading
              ? Array.from(
                  { length: SKELETON_COUNT },
                  this.renderSkeletonItem
                ).join("")
              : this.state.movies
                  .map((movie) => this.renderMovieItem(movie))
                  .join("")
          }
        </ul>
          `
            : /*html*/ `
          <div class="error">
            <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
            <h2 class="error-message">${this.state.error}</h2>
          </div>
          `
        }
      </section>
    `;
  }
}
