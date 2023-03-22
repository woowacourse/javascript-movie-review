import { Movies } from "../../domain/Movies";
import { Movie, MovieResponse } from "../../types";
import { fetchPopularMovies, fetchSearchMovies } from "../../utils/api";
import starImg from "../../../templates/star_filled.png";
import { $ } from "../../utils/selector";
import { getSkeletonContainer } from "../../utils/skeleton";

type showType = "popular" | "search";

interface State {
  show: showType;
  searchKeyword: string;
  page: number;
}

class MovieList {
  #$target;

  #state: State = {
    show: "popular",
    searchKeyword: "",
    page: 1,
  };

  #movies: Movies = new Movies([]);

  #$skeletonContainer = getSkeletonContainer();

  constructor($target: Element) {
    this.#$target = $target;
    this.renderSkeleton();
    this.init();

    $(".btn").addEventListener("click", this.onClickMoreButton.bind(this));
  }

  async init() {
    this.#$target.removeChild(this.#$skeletonContainer);

    const response = await fetchPopularMovies(this.#state.page);
    const { results, total_pages } = response;
    this.#movies.reset(results);

    this.renderMovieList(total_pages);
  }

  renderMovieList(total_pages: number) {
    this.#$target.innerHTML = `
      ${this.#movies
        .getList()
        .map((movie) => this.getMovieCardTemplate(movie))
        .join("")}
    `;

    if (this.#state.page === total_pages) this.hideMoreButton();
  }

  getMovieCardTemplate(movie: Movie) {
    return /*html*/ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
            />
            <p class="item-title">${movie.title}</p>
            <p class="item-score"><img src="${starImg}" alt="별점" />${movie.vote_average}</p>
          </div>
        </a>
      </li>
    `;
  }

  renderAddedMovie(movieList: MovieResponse[], total_pages: number) {
    this.#$target.removeChild(this.#$skeletonContainer);

    this.#$target.innerHTML += `
        ${movieList.map((movie) => this.getMovieCardTemplate(movie)).join("")}
    `;
    this.#movies.add(movieList);

    if (this.#state.page === total_pages) this.hideMoreButton();
  }

  async reset(state: showType, searchKeyword?: string) {
    this.#$target.innerHTML = ``;

    this.#state = { ...this.#state, show: state, page: 1 };
    this.showMoreButton();
    this.renderSkeleton();

    if (state === "popular") {
      const response = await fetchPopularMovies(this.#state.page);

      const { results, total_pages } = response;

      this.#movies.reset(results);
      this.renderMovieList(total_pages);
      return;
    }

    if (searchKeyword) {
      this.#state = { ...this.#state, searchKeyword: searchKeyword };

      const response = await fetchSearchMovies(
        this.#state.page,
        this.#state.searchKeyword
      );
      const { results, total_pages } = response;

      this.#movies.reset(results);
      this.renderMovieList(total_pages);
    }
  }

  async onClickMoreButton() {
    this.#state.page += 1;
    this.renderSkeleton();

    if (this.#state.show === "popular") {
      const response = await fetchPopularMovies(this.#state.page);
      const { results, total_pages } = response;
      this.renderAddedMovie(results, total_pages);
    }

    if (this.#state.show === "search") {
      const response = await fetchSearchMovies(
        this.#state.page,
        this.#state.searchKeyword
      );
      const { results, total_pages } = response;
      this.renderAddedMovie(results, total_pages);
    }
  }

  renderSkeleton() {
    this.#$target.appendChild(this.#$skeletonContainer);
  }

  hideMoreButton() {
    $(".btn").setAttribute("hidden", "");
  }

  showMoreButton() {
    $(".btn").removeAttribute("hidden");
  }
}

export { MovieList };
