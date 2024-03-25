import Component from "../../common/Component";

import { starImage } from "../../assets/image";
import { MovieItem } from "../../types/movies";
import { $ } from "../../utils/dom";

export default class MovieList extends Component {
  private createMovieItemElement({ id, title, imagePath, voteAverage }: MovieItem) {
    const listItem = document.createElement("li");

    listItem.id = String(id);

    listItem.innerHTML = /*html*/ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}"
            loading="lazy"
            alt="${title}"/>
          <p class="item-title">${title}</p>
          <p class="item-score">
            ${voteAverage.toFixed(1)} <img src="${starImage}" alt="별점" /> 
          </p>
        </div>
      </a>
    `;

    return listItem;
  }

  private removeMoreButton() {
    const $button = $<HTMLButtonElement>("#next-button");

    $button && $button.remove();
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

    this.removeMoreButton();
  }

  public renderMovies(movies: MovieItem[]) {
    if (movies.length < 1) {
      this.renderEmptyResult();

      return;
    }

    if (movies.length < 20) {
      this.removeMoreButton();
    }

    movies.forEach((movie) => {
      const { id, title, imagePath, voteAverage } = movie;
      const movieItem = this.createMovieItemElement({ id, title, imagePath, voteAverage });
      this.$target.append(movieItem);
    });
  }
}
