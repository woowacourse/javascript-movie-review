import Component from "../common/Component";
import MovieDetail from "../MovieDetail/MovieDetail";

import { $, createElement } from "../../utils/dom";
import { MovieItem } from "../../types/movies";
import { filledStarLogo } from "../../assets/image";
import { ERROR_IMAGE_SOURCE, MOVIE_LENGTH_PER_REQUEST } from "../../constants/movie";

import "./MovieList.css";
import { Optional } from "../../types/utility";

interface MovieListProps {
  removeScrollTrigger: () => void;
}

export default class MovieList extends Component<MovieListProps, {}> {
  private movieDetail: Optional<MovieDetail>;

  protected initializeState() {
    const $section = createElement<HTMLDivElement>("section");
    $section.className = "flex flex-col rounded-lg detail-container";
    $section.id = "movie-detail-container";

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
      <div class="flex flex-col cursor-pointer item-card">
        <img
          class="rounded-lg bg-contain item-thumbnail skeleton"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}"
          loading="lazy"
          onerror="this.src='${ERROR_IMAGE_SOURCE}"
          alt="${title}"/>
        <p class="font-bold item-title">${title}</p>
        <p class="flex align-center item-score">
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
      <p class="mb-1">검색 결과가 존재하지 않습니다 🥲</p>
      <li>- 단어의 철자가 정확한지 확인해 보세요</li>
      <li>- 보다 일반적인 검색어로 다시 검색해 보세요</li>
      <li>- 검색어의 띄어쓰기를 다르게 해보세요</li>
      <li>- 유해/금지어가 아닌지 확인해주세요</li>
      <li>- 더 간단한 단어로 검색해 보세요 (예: 해리 포터 -> 해리)</li>
    `;

    $div.classList.remove("hidden");

    this.props?.removeScrollTrigger();
  }

  public renderMovies(movies: MovieItem[]) {
    if (movies.length < 1) {
      this.renderEmptyResult();

      return;
    }

    if (movies.length < MOVIE_LENGTH_PER_REQUEST) {
      this.props?.removeScrollTrigger();
    }

    movies.forEach((movie) => {
      const { id, title, imagePath, voteAverage } = movie;

      const movieItem = this.createMovieItemElement({ id, title, imagePath, voteAverage });
      this.$target.append(movieItem);
    });
  }
}
