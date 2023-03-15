import { Movies } from "../../domain/Movies";
import { Movie } from "../../types";
import { fetchPopularMovies, fetchSearchMovies } from "../../utils/api";
import starImg from "../../../templates/star_filled.png";
import { $ } from "../../utils/selector";

type showType = "popular" | "search";

interface State {
  show: showType;
  searchKeyword: string;
  page: number;
}

export class MovieList {
  #$target;

  #state: State = {
    show: "popular",
    searchKeyword: "",
    page: 1,
  };

  #movies: Movies = new Movies([]);

  constructor($target: Element) {
    this.#$target = $target;

    fetchPopularMovies(this.#state.page).then((response) => {
      const { results, total_pages } = response;
      this.#movies.reset(results);
      this.init(total_pages);
    });

    $(".btn")?.addEventListener("click", this.onClickMoreButton.bind(this));
  }

  init(total_pages: number) {
    this.#$target.innerHTML = `
      ${this.#movies
        .getList()
        .map((movie) => this.getMovieCardTemplate(movie))
        .join("")}
    `;

    if (this.#state.page === total_pages) this.hideMoreButton();
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
            <p class="item-score"><img src="${starImg}" alt="별점" />${movie.vote_average}</p>
          </div>
        </a>
      </li>
    `
    );
  }

  render(movieList: Movie[], total_pages: number) {
    this.#$target.innerHTML += `
        ${movieList.map((movie) => this.getMovieCardTemplate(movie)).join("")}
    `;
    this.#movies.add(movieList);

    if (this.#state.page === total_pages) this.hideMoreButton();
  }

  reset(state: "popular" | "search", searchKeyword?: string) {
    this.#state.page = 1;
    this.#state = { ...this.#state, show: state };

    if (state === "popular") {
      fetchPopularMovies(this.#state.page).then((response) => {
        const { results, total_pages } = response;

        this.#movies.reset(results);
        this.init(total_pages);
      });

      return;
    }

    if (searchKeyword) {
      this.#state = { ...this.#state, searchKeyword: searchKeyword };

      fetchSearchMovies(this.#state.page, this.#state.searchKeyword).then(
        (response) => {
          const { results, total_pages } = response;

          this.#movies.reset(results);
          this.init(total_pages);
        }
      );
    }
  }

  onClickMoreButton() {
    this.#state.page += 1;

    if (this.#state.show === "popular")
      fetchPopularMovies(this.#state.page).then((response) => {
        const { results, total_pages } = response;
        this.render(results, total_pages);
      });

    if (this.#state.show === "search")
      fetchSearchMovies(this.#state.page, this.#state.searchKeyword).then(
        (response) => {
          const { results, total_pages } = response;
          this.render(results, total_pages);
        }
      );
  }

  hideMoreButton() {
    $(".btn")?.setAttribute("hidden", "true");
  }
}
