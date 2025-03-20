import { MovieInfo } from "../../types/movieType";
import MovieService from "../services/MovieService";
import Button from "./Button";
import MovieList from "./MovieList";

function ContentsContainer(results: MovieInfo[], contentTitle: string) {
  // MovieList 렌더링
  // Todo: handler로 분리하기
  const movieList = new MovieList(results);
  const $listContainer = movieList.renderMovieList();
  const $section = document.querySelector("section");
  const $h2 = document.createElement("h2");

  $h2.innerText = contentTitle;

  $section?.appendChild($h2);
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

  if ($main) {
    // 기존 "더 보기" 버튼 제거 (중복 방지)
    const existingButton = $main.querySelector("button.more");
    if (existingButton) {
      existingButton.remove();
    }
  }
  const $button = Button("더 보기", "more", clickMoreMovies);

  $main?.appendChild($button);
}

export default ContentsContainer;
