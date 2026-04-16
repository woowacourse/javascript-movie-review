import { removeSkeleton, renderSkeleton } from "../render/skeleton";
import { renderMoviesList } from "../render/movieList";
import { fetchSearchedMovies } from "../api/fetchMovies";
import { createNotFoundElement } from "../render/createNotFoundElement";
import PageStore from "../store";
import { requireElement } from "../utils/dom";

class SearchForm {
  #search: {
    form: HTMLFormElement;
    input: HTMLInputElement;
  };

  #view: {
    backgroundContainer: HTMLDivElement;
    sectionContainer: HTMLElement;
    sectionTitle: HTMLElement;
    thumbnailList: HTMLElement;
  };

  constructor() {
    this.#search = {
      form: requireElement<HTMLFormElement>(".search"),
      input: requireElement<HTMLInputElement>(".search-input"),
    };
    this.#view = {
      backgroundContainer: requireElement<HTMLDivElement>(
        ".background-container",
      ),
      sectionContainer: requireElement<HTMLElement>(".section-container"),
      sectionTitle: requireElement<HTMLElement>(".section-title"),
      thumbnailList: requireElement<HTMLElement>(".thumbnail-list"),
    };
  }

  bindEvent() {
    this.#search.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });
  }

  private async handleSubmit() {
    const searchValue = this.#search.input.value.trim();

    if (!searchValue) {
      return;
    }

    PageStore.setSearchMode(searchValue);
    this.prepareSearchView(searchValue);

    try {
      renderSkeleton();
      const movies = await this.lodeList(1);
      if (movies.length === 0) {
        this.renderEmptyResult();
        return;
      }

      const loadMore = async () => {
        if (PageStore.page >= PageStore.totalPages) return;
        try {
          renderSkeleton();
          const movies = await this.lodeList(PageStore.page + 1);
          removeSkeleton();
          if (!movies.length) return;
          renderMoviesList(movies, { append: true }, loadMore);
        } catch (error) {
          alert("검색 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
          removeSkeleton();
        }
      };

      renderMoviesList(movies, { append: false }, loadMore);
    } catch (error) {
      this.handleSearchError(error);
    } finally {
      removeSkeleton();
    }
  }

  private async lodeList(page: number) {
    const { movies, nowPage, totalPages } = await fetchSearchedMovies(
      page,
      PageStore.query,
    );

    PageStore.setPagination(nowPage, totalPages);

    return movies;
  }

  private prepareSearchView(searchValue: string) {
    this.#view.backgroundContainer.style.display = "none";
    this.#view.sectionTitle.textContent = `"${searchValue}" 검색 결과`;
    this.#view.thumbnailList.replaceChildren();
    this.removeNotFoundContainer();
  }

  private renderEmptyResult() {
    const empty = createNotFoundElement();
    this.#view.sectionContainer.appendChild(empty);
  }

  private removeNotFoundContainer() {
    const notSearchFoundContainer = document.querySelector(
      ".not-search-found-container",
    );
    notSearchFoundContainer?.remove();
  }

  private handleSearchError(error: unknown) {
    console.error("검색 중 에러:", error);
    alert("검색 중 문제가 발생했어요");
  }
}

export default SearchForm;
