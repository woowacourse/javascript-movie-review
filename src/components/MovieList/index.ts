import "./index.css";

import type { MovieResponse } from "../../types";

import { getURL, request } from "../../utils/api";
import { $ } from "../../utils/selector";
import {
  deleteSkeletonContainer,
  getSkeletonContainer,
  showSkeletonContainer,
} from "./Skeleton";
import { getMovieCardTemplate } from "./MovieCard";

type showType = "popular" | "search";

export interface State {
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

  constructor($target: Element) {
    this.#$target = $target;

    this.init();
  }

  async init() {
    this.#$target.insertAdjacentElement("afterend", getSkeletonContainer());

    try {
      const { results, total_pages } = await request(
        getURL({ state: this.#state })
      );

      this.render(results, total_pages);

      new IntersectionObserver(this.fetchNextPage.bind(this)).observe(
        $(".btn")
      );
    } catch {
      deleteSkeletonContainer();
    }
  }

  render(movieList: MovieResponse[], total_pages: number) {
    deleteSkeletonContainer();

    this.#$target.insertAdjacentHTML(
      "beforeend",
      `${movieList.map(getMovieCardTemplate).join("")}
      `
    );

    if (this.#state.page === total_pages) this.hideMore();

    if (this.#state.page === 1 && movieList.length === 0) {
      const subTitle = $(".sub-title");

      subTitle.innerHTML = "검색 결과 없음";
    }
  }

  async changeShowTarget(state: showType, searchKeyword?: string) {
    this.#$target.innerHTML = ``;
    this.#state = {
      ...this.#state,
      showState: state,
      page: 1,
      searchKeyword: searchKeyword ?? "",
    };

    this.showMore();
    showSkeletonContainer();

    const { results, total_pages } = await request(
      getURL({ state: this.#state })
    );

    this.render(results, total_pages);

    deleteSkeletonContainer();
  }

  async fetchNextPage() {
    this.#state.page += 1;
    showSkeletonContainer();

    try {
      const { results, total_pages } = await request(
        getURL({ state: this.#state })
      );

      this.render(results, total_pages);
    } catch {
      deleteSkeletonContainer();
    }
  }

  hideMore() {
    $(".btn").setAttribute("hidden", "");
  }

  showMore() {
    $(".btn").removeAttribute("hidden");
  }
}
