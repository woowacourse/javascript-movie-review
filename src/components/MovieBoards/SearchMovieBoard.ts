import { createApi } from "../../api/ApiFactory";
import { Movie } from "../../types/movie";
import BaseMovieBoard, { MovieBoardConfig } from "./@shared/BaseMovieBoard";
import ErrorScreen from "./@shared/ErrorScreen";
import MovieList from "./@shared/MovieList";

interface Props {
  searchParams: string;
}

class SearchMovieBoard extends BaseMovieBoard {
  constructor(parentElement: HTMLElement, props: Props) {
    const apiInstance = createApi(() =>
      new ErrorScreen("오류가 발생했습니다.").render()
    );

    const config: MovieBoardConfig = {
      parentElement,
      initialRender: () => {
        parentElement.innerHTML = /*html*/ `
          <section class="movie-list-container search-movie-list-container">
              <h2>"${props.searchParams}" 검색 결과</h2>
              <ul class="thumbnail-list">
                ${new MovieList([]).skeleton}
              </ul>
          </section>
        `;
      },
      fetchMovies: async (page: number) => {
        const data = await apiInstance.searchedMovies(props.searchParams, page);
        return { movies: data.results, total_pages: data.total_pages };
      },
      renderMovieList: (movies: Movie[]) => new MovieList(movies).ui,
    };

    super(config);
  }
}

export default SearchMovieBoard;
