import { MovieResult } from "../../../types/movie";
import { PREFIX_POSTER_PATH } from "../../constants/constants";
import Skeleton from "../Common/Skeleton";

const SKELETON_COUNT = 20;

interface MainRenderProps {
  movies?: MovieResult[];
  isLoading?: boolean;
  title?: string;
}

export default class Main {
  private static instance: Main;
  private $main: HTMLElement;
  private title: MainRenderProps["title"];

  private constructor() {
    this.$main = document.createElement("main");
    this.title = "지금 인기 있는 영화";
    this.render({ isLoading: true });
  }

  // 싱글톤
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
        <div class="item">
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

  render({ movies = [], isLoading = true, title }: MainRenderProps = {}) {
    if (title) this.title = title;

    this.$main.innerHTML = /*html*/ `
    <section>
      <h2 class="thumbnail-title">${this.title}</h2>
      <ul class="thumbnail-list">
        ${
          isLoading
            ? Array.from(
                { length: SKELETON_COUNT },
                this.renderSkeletonItem
              ).join("")
            : movies.map((movie) => this.renderMovieItem(movie)).join("")
        }
      </ul>
      <div class="error close">
        <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
        <h2 class="error-message"></h2>
      </div>
    </section>
  `;
  }

  getElement() {
    return this.$main;
  }
}
