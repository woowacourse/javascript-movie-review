import "./MovieListSection.css";
import MovieItem from "../MovieItem/MovieItem";
import EmptyView from "../EmptyView/EmptyView";
import Modal from "../../Common/Modal/Modal";
import { MOVIE } from "../../../constants/movie";

class MovieListSection {
  constructor(
    title,
    movies,
    isLoading,
    $target,
    loadMoreMovies,
    isLastPage,
    setMovieId
  ) {
    this.title = title;
    this.movies = movies;
    this.isLoading = isLoading;
    this.$target = $target;
    this.loadMoreMovies = loadMoreMovies;
    this.isLastPage = isLastPage;
    this.setMovieId = setMovieId;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => this.handleIntersect(entry));
      },
      { threshold: 0 }
    );
  }

  async render() {
    this.$target.innerHTML = "";

    const $section = document.createElement("section");
    const $title = document.createElement("h2");
    $title.textContent = this.getTitle();
    $section.appendChild($title);

    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");

    if (this.movies === null) {
      new EmptyView("오류가 발생했습니다.", $section).render();

      this.$target.appendChild($section);
      return;
    }

    const totalMovie = this.movies.length;

    if (this.isLoading && totalMovie === 0) {
      this.renderMovieItemByArray(
        Array(MOVIE.MAX_MOVIES_PER_PAGE).fill(0),
        $ul,
        this.isLoading
      );
      $section.appendChild($ul);
      this.$target.appendChild($section);
    }

    if (totalMovie === 0) {
      $section.appendChild($title);

      new EmptyView("검색 결과가 없습니다.", $section).render();

      this.$target.appendChild($section);
      return;
    }

    this.renderMovieItemByArray(this.movies, $ul, false);
    if (this.isLoading) {
      this.renderMovieItemByArray(
        Array(MOVIE.MAX_MOVIES_PER_PAGE).fill(0),
        $ul,
        this.isLoading
      );
    }

    this.$target.append($title, $ul);

    const $nextLi = $ul.querySelector("li:last-child");

    if ($nextLi !== null) {
      this.observer.observe($nextLi);
    }
  }

  handleIntersect(entry) {
    if (entry.isIntersecting && !this.isLoading && !this.isLastPage()) {
      this.loadMoreMovies(entry);
    }
  }

  handleMovieItemClick = (movieId) => {
    this.setMovieId(movieId);
  };

  renderMovieItemByArray(movies, $ul, isLoading) {
    movies.forEach((movie) => {
      new MovieItem(movie, isLoading, this.handleMovieItemClick, $ul).render();
    });
  }

  getTitle() {
    if (this.title === "") {
      return "지금 인기 있는 영화";
    }
    return `"${this.title}" 검색 결과`;
  }
}
export default MovieListSection;
