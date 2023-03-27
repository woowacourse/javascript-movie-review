import { fetchMovieListWithKeyword, fetchPopularMovieList } from "../../apis";
import getErrorMessage from "../../apis/getErrorMessage";
import { LIST_TYPE } from "../../constants/common";
import Movie from "../../domain/Movie";
import Modal from "../Modal";
import "./index.css";
import MovieItem from "./MovieItem";
import SkeletonList from "./SkeletonList";

class MovieList {
  $target;
  #props;
  #page;

  constructor($target, props) {
    this.$target = $target;
    this.#props = props;
    this.#page = 1;

    this.render();
    this.setEvent();
  }

  template() {
    return `
        <section class="item-view">
          <h2 class="search-title"></h2>
          <div class="list-container">
            <ul class="item-list"></ul>
            <ul class="skeleton-container"></ul>
            <div class="error-container"></div>
          </div>
          <div class="scroll-trigger"></div>
        </section>
      `;
  }

  render() {
    this.$target.innerHTML = this.template();

    const $skeletonContainer = this.$target.querySelector(".skeleton-container");
    new SkeletonList($skeletonContainer);

    this.renderTitle();
    this.renderMovieList();
  }

  renderTitle(title) {
    const { type, searchKeyword } = this.#props;
    const $searchTitle = this.$target.querySelector(".search-title");

    const text =
      title || (type === LIST_TYPE.POPULAR ? "지금 인기있는 영화" : `"${searchKeyword}" 검색결과`);

    $searchTitle.innerText = text;
  }

  renderErrorMessage(message) {
    const $errorContainer = this.$target.querySelector(".error-container");
    const messageTemplate = `
    <h3 class="error-title">영화 목록을 불러오는데 문제가 발생했습니다 :(</h2>
    <p class="error-message">[실패 사유]</p>
    <p class="error-message">${message}</p>`;

    $errorContainer.insertAdjacentHTML("beforeend", messageTemplate);
  }

  async renderMovieList() {
    const $itemList = this.$target.querySelector(".item-list");

    this.openSkeletonContainer();
    const fetchedMovieData = await this.fetchMovieList();
    this.closeSkeletonContainer();
    if (!fetchedMovieData) return;

    if (!this.isExistMovie(fetchedMovieData)) {
      const { searchKeyword } = this.#props;
      this.renderTitle(`"${searchKeyword}"에 대한 검색 결과가 없습니다 :(`);
    }
    if (this.isLastPage(fetchedMovieData)) this.toggleMoreButton();

    const movies = fetchedMovieData.results.map((movieData) => new Movie(movieData));
    movies.forEach((movie) => new MovieItem($itemList, movie));
    this.#page += 1;
  }

  async fetchMovieList() {
    const { type, searchKeyword } = this.#props;
    try {
      if (type === LIST_TYPE.POPULAR) {
        return await fetchPopularMovieList(this.#page);
      }
      if (type === LIST_TYPE.SEARCH) {
        return await fetchMovieListWithKeyword(this.#page, searchKeyword);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      this.renderErrorMessage(message);
      this.closeSkeletonContainer();
      document.querySelector(".scroll-trigger").remove();
      return false;
    }
  }

  isExistMovie(movieData) {
    return !!movieData.results.length;
  }

  isLastPage(movieData) {
    return movieData.total_pages === this.#page;
  }

  toggleMoreButton() {
    const $loadMoreButton = this.$target.querySelector(".more");

    $loadMoreButton.classList.toggle("invisible");
  }

  openSkeletonContainer() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");
    $skeletonContainer.classList.add("visible");
  }

  closeSkeletonContainer() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");
    $skeletonContainer.classList.remove("visible");
  }

  setInfinityScroll() {
    const $scrollTrigger = this.$target.querySelector(".scroll-trigger");
    const io = new IntersectionObserver(
      (entry) => {
        if (!entry[0].isIntersecting) return;

        this.renderMovieList();
      },
      {
        threshold: 0,
      }
    );

    io.observe($scrollTrigger);
  }

  setEvent() {
    this.$target.querySelector(".item-list").addEventListener("click", (event) => {
      const $itemCard = event.target.closest(".item-card");
      if (!$itemCard) return;

      const id = $itemCard.dataset.id;
      Modal.openMovieDetail(id);
    });

    this.setInfinityScroll();
  }
}

export default MovieList;
