import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";

const MovieListContainer = {
  loadMovies: async (searchKey?: string) => {
    try {
      if (searchKey) {
        $<HTMLElement>(
          "#movie-list-title"
        ).textContent = `"${searchKey}" 검색 결과`;
      }

      MovieListContainer.renderContent();

      const movies = await MovieList.getMovieData();
      MovieListContainer.renderContent(movies);

      if (movies.length < 20) {
        $<HTMLButtonElement>("#more-button").style.display = "none";
      }
      if (searchKey && movies.length === 0) {
        $<HTMLButtonElement>("#movie-list-title").style.display = "none";
        MovieListContainer.renderNoSearchMessage(searchKey);
        return;
      }
    } catch (error) {
      MovieListContainer.renderErrorMessage();
      console.log(error);
    }
  },

  render() {
    return `
    <section class="item-view">
      <h2 id="movie-list-title">지금 인기 있는 영화</h2>
      <ul class="item-list"></ul>
      <button id="more-button" class="btn primary full-width">더 보기</button>
    </section>
    `;
  },

  renderContent: (movies?: Movie[]) => {
    const template = `
        ${
          !movies
            ? `
        <li>
          <a href="#">
            <div class="item-card">
              <div class="item-thumbnail skeleton"></div>
              <div class="item-title skeleton"></div>
              <div class="item-score skeleton"></div>
            </div>
          </a>
          </li>`.repeat(20)
            : movies.map((movie) => MovieItem.render(movie)).join("")
        }`;

    $<HTMLElement>(".item-list").replaceChildren();
    $<HTMLElement>(".item-list").insertAdjacentHTML("beforeend", template);
  },

  renderNoSearchMessage: (searchKey: string) => {
    const template = `
      <div class="error-message">
        <h3>입력하신 검색어 "${searchKey}"(와)과 일치하는 결과가 없습니다.</h3>
        <p>다른 키워드를 입력해 보세요.</p>
      </div>`;

    const errorMessageElement = document.querySelector(".error-message");

    if (errorMessageElement) {
      $<HTMLElement>(".item-view").removeChild(errorMessageElement);
    }

    $<HTMLElement>(".item-view").insertAdjacentHTML("afterbegin", template);
  },

  renderErrorMessage: () => {
    $<HTMLElement>(".item-view").replaceChildren();
    const template = `
      <div class="error-message">
        <h3>서비스 이용에 불편을 드려 죄송합니다.</h3>
        <p>새로고침 단추를 클릭하거나 나중에 다시 시도해 주세요.</p>
      </div>`;

    const errorMessageElement = document.querySelector(".error-message");

    if (errorMessageElement) {
      $<HTMLElement>(".item-view").removeChild(errorMessageElement);
    }

    $<HTMLElement>(".item-view").insertAdjacentHTML("afterbegin", template);
  },

  onClick: () => {
    $<HTMLButtonElement>("#more-button").addEventListener("click", async () => {
      const movies: Movie[] = await MovieList.getMovieData();
      $<HTMLUListElement>(".item-list").insertAdjacentHTML(
        "beforeend",
        movies.map((movie) => MovieItem.render(movie)).join("")
      );

      if (movies.length < 20) {
        $<HTMLButtonElement>("#more-button").style.display = "none";
      }
    });
  },
};

export default MovieListContainer;
