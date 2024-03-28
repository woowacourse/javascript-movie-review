import Component from "../common/Component";
import MovieDetail from "../MovieDetail/MovieDetail";

import { $, createElement } from "../../utils/dom";
import { MovieItem } from "../../types/movies";
import { filledStarLogo } from "../../assets/image";

import "./MovieList.css";

interface MovieListProps {
  removeScrollTrigger: () => void;
}

export default class MovieList extends Component<MovieListProps, {}> {
  private ERROR_IMAGE_SOURCE =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  private movieDetail: MovieDetail | undefined;

  protected initializeState() {
    const $section = createElement<HTMLDivElement>("section");
    $section.className = "detail-container flex flex-col rounded-lg";

    this.movieDetail = new MovieDetail($section);
  }

  protected setEvent() {
    const $ul = $<HTMLUListElement>("#movie-list-container");

    $ul?.addEventListener("click", (event: Event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const $li = event.target.closest("li");

      if ($li) {
        this.movieDetail?.handleRenderDetail($li.id);
      }
    });
  }

  private createMovieItemElement({ id, title, imagePath, voteAverage }: MovieItem) {
    const listItem = document.createElement("li");

    listItem.id = String(id);

    listItem.innerHTML = /*html*/ `
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}"
          onerror="this.src='${this.ERROR_IMAGE_SOURCE}'"
          loading="lazy"
          alt="${title}"/>
        <p class="item-title">${title}</p>
        <p class="item-score">
          ${voteAverage.toFixed(1)} <img src="${filledStarLogo}" alt="별점" /> 
        </p>
      </div>    
    `;

    return listItem;
  }

  private renderEmptyResult() {
    const $div = $<HTMLDivElement>("#empty-result");

    if (!$div) return;

    $div.innerHTML = /*html*/ `
      <h2>검색 결과가 존재하지 않습니다.</h2>
      <p>단어의 철자가 정확한지 다시 한번 확인해볼까요?</p>
      <p>너무 긴 검색어라면 검색어를 줄여주시고, 보다 일반적인 검색어로 검색 부탁드려요!</p>
    `;

    $div.classList.remove("hidden");

    this.props?.removeScrollTrigger();
  }

  public renderMovies(movies: MovieItem[]) {
    if (movies.length < 1) {
      this.renderEmptyResult();

      return;
    }

    if (movies.length < 20) {
      this.props?.removeScrollTrigger();
    }

    movies.forEach((movie) => {
      const { id, title, imagePath, voteAverage } = movie;

      const movieItem = this.createMovieItemElement({ id, title, imagePath, voteAverage });
      this.$target.append(movieItem);
    });
  }
}
