import { MovieInfo } from "../../../types/movieType";
import MovieService from "../../services/MovieService";
import Button from "../Button/Button";
import { hideSkeleton, showSkeleton } from "../Skeleton/showSkeleton";
import MovieList from "./MovieList";

const MAXIMUM_PAGE = 500;

async function ContentsContainer(results: MovieInfo[], contentTitle: string) {
  const $main = document.querySelector("main");
  const movieService = new MovieService();
  const $section = document.querySelector("section");
  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section?.appendChild($h2);

  const movieList = new MovieList(results);
  const $movieList = movieList.renderMovieList();
  $section?.appendChild($movieList);
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
  }
  async function clickMoreMovies(event: MouseEvent) {
    movieService.nextPage();

    showSkeleton(20, "section");

    const additionalData = await movieService.getPopularMovies();

    hideSkeleton();
    const movieList = new MovieList(additionalData.results);
    const $movieList = movieList.renderMovieList();

    const $moreButton = event.target as HTMLButtonElement;
    if (movieService.currentPage === MAXIMUM_PAGE) {
      $moreButton.remove();
    }

    $section?.appendChild($movieList);
  }

  function removeButton() {
    const existingButton = $main?.querySelector("button.more");
    if (existingButton) {
      existingButton.remove();
    }
  }
}

export default ContentsContainer;
