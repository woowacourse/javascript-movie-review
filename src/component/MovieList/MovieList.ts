import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import hangsungImg from "../../image/wooteco-icon.png";
import { $, $$, createElement } from "../../utility/dom";

class MovieList {
  movieListSection;

  constructor() {
    this.movieListSection = $(".item-view") as Element;
  }

  // NOTE: 인기순 및 검색 리스트 공통 메서드
  createMovieItem() {
    const li = createElement("li");
    const article = createElement("article", {
      class: "item-card",
    });
    const thumbnail = createElement("img", {
      class: "item-thumbnail skeleton",
      loading: "lazy",
      alt: "",
    }) as HTMLImageElement;
    const title = createElement("h3", {
      class: "item-title skeleton",
    });
    const scoreWrapper = createElement("div", {
      class: "item-score-wrapper",
    });
    const score = createElement("span", {
      class: "item-score skeleton",
    });
    const starImg = createElement("img", {
      class: "item-filled-star",
    }) as HTMLImageElement;

    scoreWrapper.appendChild(score);
    scoreWrapper.appendChild(starImg);
    article.appendChild(thumbnail);
    article.appendChild(title);
    article.appendChild(scoreWrapper);
    li.appendChild(article);

    return li;
  }

  createEmptyMovieItems(
    movies: IMovieItemData[],
    ul: HTMLElement | null
  ): HTMLLIElement[] {
    return movies.map(() => {
      const liElement = this.createMovieItem() as HTMLLIElement;
      ul?.appendChild(liElement);
      return liElement;
    });
  }

  updateMovieItemsWithData(movies: IMovieItemData[], liList: HTMLLIElement[]) {
    this.removeSkeleton();

    const movieItems = movies.map(({ title, id, poster_path, vote_average }) => {
      return new MovieItem({ title, id, poster_path, vote_average });
    });

    movieItems.forEach((movieItem: MovieItem, index: number) => {
      const li = liList[index];
      if (li) {
        movieItem.setMovieItemData(li);
      }
    });
  }

  displayMaxPageInfo() {
    this.removeMoreMoviesButton();
    const maxPageInfo = this.createMaxPageInfo();

    this.movieListSection.appendChild(maxPageInfo);
  }

  createMaxPageInfo() {
    const maxPageInfoElement = createElement("p", {
      class: "max-page-info",
    });
    maxPageInfoElement.textContent = "목록의 끝에 도달했습니다 🚀";

    return maxPageInfoElement;
  }

  createMoreMoviesButton() {
    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();
    this.movieListSection.appendChild(moreMoviesButton);

    return moreMoviesButton;
  }

  removeMoreMoviesButton() {
    $(".more-movies-btn")?.remove();
  }

  removeSkeleton() {
    const skeletonElements = $$(".skeleton");

    if (skeletonElements) {
      skeletonElements.forEach((element) => {
        element.classList.remove("skeleton");
      });
    }
  }

  createErrorUI(message: String) {
    const mainElement = $("main");
    if (mainElement) {
      mainElement.innerHTML = `
      <section class="section-error">
        <img class="wooteco-icon" src="${hangsungImg}"></img>
        <p class="error-message">${message}</p>
      </section>
    `;
    }
  }
}

export default MovieList;
