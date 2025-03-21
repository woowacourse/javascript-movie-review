import { MovieInfo } from "../../../types/movieType";
import MovieService from "../../services/MovieService";
import Button from "../Button/Button";
import MovieList from "./MovieList";

const MAXIMUM_PAGE = 500;

async function ContentsContainer(results: MovieInfo[], contentTitle: string) {
  const $main = document.querySelector("main");
  const movieService = new MovieService();
  const movieList = new MovieList(results);
  const $listContainer = movieList.renderMovieList();
  const $section = document.querySelector("section");
  const $h2 = document.createElement("h2");

  $h2.innerText = contentTitle;

  $section?.appendChild($h2);
  $section?.appendChild($listContainer);

  removeButton();
  const $button = Button("더 보기", "more", clickMoreMovies);
  $main?.appendChild($button);

  if (document.querySelector(".contentContainer")) {
    document.querySelector(".contentContainer")?.remove();
  }
  const $contentContainer = document.createElement("div");
  $contentContainer.classList.add("contentContainer");

  if (results.length === 0) {
    $contentContainer.innerHTML = `
        <img src="./no_results.png">
        <div>검색 결과가 없습니다.</div>
    `;
    $main?.appendChild($contentContainer);
    removeButton();
  } else {
  }
  async function clickMoreMovies(event: MouseEvent) {
    movieService.nextPage();
    const additionalData = await movieService.getPopularMovies();
    const movieList = new MovieList(additionalData.results);
    const $listContainer = movieList.renderMovieList();
    const $section = document.querySelector("section");
    const $moreButton = event.target as HTMLButtonElement;
    if (movieService.currentPage === MAXIMUM_PAGE) {
      $moreButton.remove();
    }
    $section?.appendChild($listContainer);
  }

  function removeButton() {
    // 기존 "더 보기" 버튼 제거 (중복 방지)
    const existingButton = $main?.querySelector("button.more");
    if (existingButton) {
      existingButton.remove();
    }
  }
}

export default ContentsContainer;
