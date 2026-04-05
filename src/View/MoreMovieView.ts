import { removeSkeleton, renderSkeleton } from "../render";
import { fetchSearchedMovies, fetchPopularMovies } from "../api/fetchMovies";
import { makeMovieThumbnail } from "../thumnailManager";
import PageStore from "../store";

interface MoreMovieViewDomType {
  button: HTMLButtonElement | null;
}

class MoreMovieView {
  #dom: MoreMovieViewDomType;

  constructor() {
    this.#dom = {
      button: document.querySelector(".more-button"),
    };
  }

  hide() {
    this.#dom.button!.style.display = "none";
  }

  disable() {
    this.#dom.button!.disabled = true;
    this.#dom.button!.style.cursor = "not-allowed";
  }

  able() {
    this.#dom.button!.disabled = false;
    this.#dom.button!.style.cursor = "pointer";
  }

  bindEvent() {
    this.#dom.button!.addEventListener("click", async (e) => {
      this.disable();
      const thumbnailList = document.querySelector(".thumbnail-list");
      const searchInput: HTMLInputElement | null =
        document.querySelector(".search-input");
      const searchValue = searchInput?.value;

      if (searchValue!.length !== 0) {
        renderSkeleton();

        const { movies, nowPage, totalPages } = await fetchSearchedMovies(
          ++PageStore.searchMoviePage,
          searchInput!.value,
        );
        removeSkeleton();
        movies!.forEach((movie) => {
          const thumbnail = makeMovieThumbnail(movie);
          thumbnailList?.appendChild(thumbnail);
        });

        if (nowPage === totalPages) {
          this.#dom.button!.style.display = "none";
        }
      } else {
        renderSkeleton();
        const { movies, nowPage, totalPages } = await fetchPopularMovies(
          ++PageStore.popularMoviePage,
        );
        removeSkeleton();
        movies!.forEach((movie) => {
          const thumbnail = makeMovieThumbnail(movie);
          thumbnailList?.appendChild(thumbnail);
        });

        if (nowPage === totalPages) {
          this.#dom.button!.style.display = "none";
        }
      }

      this.able();
    });
  }
}

export default MoreMovieView;
