import { MovieInfo } from "../../types/movieType";
import MovieService from "../services/MovieService";
import Button from "./Button";
import MovieList from "./MovieList";

function ContentsContainer(results: MovieInfo[]) {
  // MovieList 렌더링
  // Todo: handler로 분리하기
  const movieList = new MovieList(results);
  const $listContainer = movieList.renderMovieList();
  const $section = document.querySelector("section");
  $section?.appendChild($listContainer);

  const movieService = new MovieService();

  async function clickMoreMovies(event: MouseEvent) {
    movieService.nextPage();
    const additionalData = await movieService.getPopularMovies();
    const movieList = new MovieList(additionalData.results);
    const $listContainer = movieList.renderMovieList();
    const $section = document.querySelector("section");
    $section?.appendChild($listContainer);
  }

  // 더보기 버튼
  const $main = document.querySelector("main");
  const $button = Button("더 보기", "more", clickMoreMovies);

  $main?.appendChild($button);
}

export default ContentsContainer;
