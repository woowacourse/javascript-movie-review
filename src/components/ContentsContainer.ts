import MovieService from "../services/MovieService.js";
import MovieList from "../components/MovieList.js";
import Button from "../components/Button.js";
import { MovieInfo } from "../../types/movieType.js";

const MAXIMUM_PAGE = 500;

export async function ContentsContainer(results: MovieInfo[], contentTitle:string) {
  const $main = document.querySelector("main") as HTMLElement;
  const $section = document.querySelector("section") as HTMLElement;

  renderContentHeader($section, contentTitle);

  const movieList = new MovieList(results);
  const $listContainer = movieList.renderMovieList();
  $section.appendChild($listContainer);


  removeMoreButton($main);

  if (results.length === 0) {
    renderNoResults($main);
  } else {
    const $moreButton = Button("더 보기", "more", async (event: MouseEvent) => {
      await handleMoreMovies(event);
    });
    $main.appendChild($moreButton);
  }
}

function renderContentHeader($section:HTMLElement, contentTitle:string) {
  const existingHeader = $section.querySelector("h2");
  if (existingHeader) existingHeader.remove();

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;

  $section.prepend($h2);
}

async function handleMoreMovies(event:MouseEvent) {
  const movieService = new MovieService();
  movieService.nextPage();
  const additionalData = await movieService.getPopularMovies();
  const movieList = new MovieList(additionalData.results);
  const $listContainer = movieList.renderMovieList();
  const $section = document.querySelector("section") as HTMLElement;
  const $moreButton = event.target as HTMLButtonElement;

  if (movieService.currentPage === MAXIMUM_PAGE) {
    $moreButton.remove();
  }
  $section.appendChild($listContainer);
}

function removeMoreButton($main:HTMLElement) {
  const existingButton = $main.querySelector("button.more");
  if (existingButton) {
    existingButton.remove();
  }
}

function renderNoResults($main:HTMLElement) {
  const existingContentContainer = document.querySelector(".contentContainer");
  if (existingContentContainer) {
    existingContentContainer.remove();
  }
  const $contentContainer = document.createElement("div");
  $contentContainer.classList.add("contentContainer");
  $contentContainer.innerHTML = `
    <img src="./no_results.png" alt="검색 결과 없음">
    <div>검색 결과가 없습니다.</div>
  `;
  $main.appendChild($contentContainer);
  removeMoreButton($main);
}
