import { Movies } from "../../domain/Movies";
import { Movie, MovieResponse } from "../../types";
import { fetchPopularMovies, fetchSearchMovies } from "../../utils/api";
import starImg from "../../../templates/star_filled.png";
import { $ } from "../../utils/selector";
import { getSkeletonContainer } from "../../utils/skeleton";

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

  #$skeletonContainer = getSkeletonContainer();

  constructor($target: Element) {
    this.#$target = $target;
    this.renderSkeleton();

    fetchPopularMovies(this.#state.page).then((response) => {
      const { results, total_pages } = response;
      this.#movies.reset(results);
      this.render(results, total_pages);
    });

    $(".btn")?.addEventListener("click", this.onClickMoreButton.bind(this));
  }

  getMovieCardTemplate(movie: Movie) {
    return (
      /*html*/
      `
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
            <p class="item-score"><img src="${starImg}" alt="별점 ${movie.vote_average}" />${movie.vote_average}</p>
          </div>
        </a>
      </li>
    `
    );
  }

  render(movieList: MovieResponse[], total_pages: number) {
    this.#$target.removeChild(this.#$skeletonContainer);

    if (this.#state.page !== 1) this.#movies.add(movieList);

    this.#$target.insertAdjacentHTML(
      "beforeend",
      `${this.#movies
        .getCurrentList()
        .map((movie) => this.getMovieCardTemplate(movie))
        .join("")}`
    );

    if (this.#state.page === total_pages) this.hideMoreButton();
  }

  reset(state: showType, searchKeyword?: string) {
    this.#$target.innerHTML = ``;
    this.#state = { ...this.#state, showState: state, page: 1 };

    this.showMoreButton();
    this.renderSkeleton();

    if (state === "popular") {
      fetchPopularMovies(this.#state.page)
        .then((response) => {
          const { results, total_pages } = response;

          this.#movies.reset(results);
          this.render(results, total_pages);
        })
        .catch(() => {
          this.#$target.removeChild(this.#$skeletonContainer);
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
          this.#$target.removeChild(this.#$skeletonContainer);
        });
    }
  }

  onClickMoreButton() {
    this.#state.page += 1;
    this.renderSkeleton();

    if (this.#state.showState === "popular")
      fetchPopularMovies(this.#state.page)
        .then((response) => {
          const { results, total_pages } = response;

          this.render(results, total_pages);
        })
        .catch(() => {
          this.#$target.removeChild(this.#$skeletonContainer);
        });

    if (this.#state.showState === "search")
      fetchSearchMovies(this.#state.page, this.#state.searchKeyword)
        .then((response) => {
          const { results, total_pages } = response;

          this.render(results, total_pages);
        })
        .catch(() => {
          this.#$target.removeChild(this.#$skeletonContainer);
        });
  }

  renderSkeleton() {
    this.#$target.appendChild(this.#$skeletonContainer);
  }

  hideMoreButton() {
    $(".btn")?.setAttribute("hidden", "");
  }

  showMoreButton() {
    $(".btn")?.removeAttribute("hidden");
  }
}
