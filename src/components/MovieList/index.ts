import "./movieList.css";

import { Movie, MovieResponse } from "../../types";

import { Movies } from "../../domain/Movies";
import { fetchPopularMovies, fetchSearchMovies } from "../../utils/api";
import { $ } from "../../utils/selector";
import {
  deleteSkeletonContainer,
  getSkeletonContainer,
  showSkeletonContainer,
} from "./Skeleton";
import { getMovieCardTemplate } from "./MovieCard";

type showType = "popular" | "search";

interface State {
  showState: showType;
  searchKeyword: string;
  page: number;
}

export class MovieList {
  #$target;

  #state: State = {
    showState: "popular",
    searchKeyword: "",
    page: 1,
  };

  #movies: Movies = new Movies([]);

  constructor($target: Element) {
    this.#$target = $target;

    this.init();
  }

  init() {
    this.#$target.insertAdjacentElement("afterend", getSkeletonContainer());

    fetchPopularMovies(this.#state.page)
      .then((response) => {
        const { results, total_pages } = response;

        this.#movies.reset(results);
        this.render(results, total_pages);

        new IntersectionObserver(this.fetchNextPage.bind(this)).observe(
          $(".btn")
        );
      })
      .catch(() => {
        deleteSkeletonContainer();
      });
  }

  render(movieList: MovieResponse[], total_pages: number) {
    deleteSkeletonContainer();

    if (this.#state.page !== 1) this.#movies.add(movieList);

    this.#$target.insertAdjacentHTML(
      "beforeend",
      `${this.#movies
        .getCurrentList()
        .map((movie) => getMovieCardTemplate(movie))
        .join("")}
      `
    );

    if (this.#state.page === total_pages) this.deactivateScrollFetch();
  }

  changeShowTarget(state: showType, searchKeyword?: string) {
    this.#$target.innerHTML = ``;
    this.#state = { ...this.#state, showState: state, page: 1 };

    this.activateScrollFetch();
    showSkeletonContainer();

    if (state === "popular") {
      fetchPopularMovies(this.#state.page)
        .then((response) => {
          const { results, total_pages } = response;

          this.#movies.reset(results);
          this.render(results, total_pages);
        })
        .catch(() => {
          deleteSkeletonContainer();
        });

      return;
    }

    if (searchKeyword) {
      this.#state = { ...this.#state, searchKeyword: searchKeyword };

      fetchSearchMovies(this.#state.page, this.#state.searchKeyword)
        .then((response) => {
          const { results, total_pages } = response;

          this.#movies.reset(results);
          this.render(results, total_pages);
        })
        .catch(() => {
          deleteSkeletonContainer();
        });
    }
  }

  fetchNextPage() {
    this.#state.page += 1;
    showSkeletonContainer();

    if (this.#state.showState === "popular")
      fetchPopularMovies(this.#state.page)
        .then((response) => {
          const { results, total_pages } = response;

          this.render(results, total_pages);
        })
        .catch(() => {
          deleteSkeletonContainer();
        });

    if (this.#state.showState === "search")
      fetchSearchMovies(this.#state.page, this.#state.searchKeyword)
        .then((response) => {
          const { results, total_pages } = response;

          this.render(results, total_pages);
        })
        .catch(() => {
          deleteSkeletonContainer();
        });
  }

  deactivateScrollFetch() {
    $(".btn").setAttribute("hidden", "");
  }

  activateScrollFetch() {
    $(".btn").removeAttribute("hidden");
  }

  getMovieInfo(id: number, handleClickMovieCard: (movieInfo: Movie) => void) {
    handleClickMovieCard(this.#movies.getMovieInfoById(id));
  }
}
