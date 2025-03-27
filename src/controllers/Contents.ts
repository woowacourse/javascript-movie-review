import MovieService from "../services/MovieService.js";
import MovieList from "../domains/MovieList.js";
import Button from "../components/Button.js";
import { FetchMoviesCallback, MovieInfo } from "../../types/movieType.js";
import MovieItem from "../components/MovieItem.js";
import Skeleton from "../components/Skeleton.js";

const MAXIMUM_PAGE = 500;

function renderContentHeader($section: HTMLElement, contentTitle: string) {
  const existingHeader = $section.querySelector("h2");
  if (existingHeader) existingHeader.remove();

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section.prepend($h2); 
}

function removeMoreButton($main:HTMLElement) {
  const existingButton = $main.querySelector("button.more");
  if (existingButton) {
    existingButton.remove();
  }
}

async function handleMoreMovies(
  event: MouseEvent,
  movieService:MovieService,
  fetchMoviesCallback: FetchMoviesCallback
) {
  showSkeleton(20);
  const data = await fetchMoviesCallback();
  const movieList = new MovieList(data.results);
  replaceSkeletonWithMovies(movieList.movieList);

  const $moreButton = event.target as HTMLButtonElement;

  if (movieService.currentPage === MAXIMUM_PAGE) {
    $moreButton.remove();
  }
}

export function showSkeleton(count: number) {
  const $moviesContainer = document.getElementById("movies-container");
  const $listContainer = document.createElement("ul");
  $listContainer.classList.add("thumbnail-list");
  for (let index = 0; index < count; index++) {
    const skeleton = Skeleton();
    $listContainer.appendChild(skeleton);
  }
  $moviesContainer?.appendChild($listContainer);
}

export function replaceSkeletonWithMovies(movies: MovieInfo[]) {
  const $moviesContainer = document.getElementById("movies-container");
  if (!$moviesContainer) return;
  const itemContainerCount =
    $moviesContainer.querySelectorAll("ul.thumbnail-list").length;
  const $listContainer =
    $moviesContainer.querySelectorAll("ul.thumbnail-list")[
      itemContainerCount - 1
    ];
  if (!$listContainer) return;

  movies.forEach((movie, index) => {
    const $movieItem = MovieItem(movie);
    const $skeleton = $listContainer.children[index];
    if ($skeleton) {
      $listContainer.replaceChild($movieItem, $skeleton);
    } else {
      $listContainer.appendChild($movieItem);
    }
  });

  while ($listContainer.children.length > movies.length) {
    $listContainer.removeChild($listContainer.lastChild!);
  }
}

// 결과가 없을 경우 "검색 결과 없음" 메시지 렌더링
function renderNoResults($main: HTMLElement) {
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

export function ContentsContainer(
  contentTitle: string,
  movieList:MovieList,
  movieService:MovieService,
  fetchMoviesCallback: FetchMoviesCallback
) {
  const $main = document.querySelector("main") as HTMLElement;

  // 콘텐츠 헤더 렌더링
  renderContentHeader($main, contentTitle);
  replaceSkeletonWithMovies(movieList.movieList);
  removeMoreButton($main);

  if (movieList.movieList.length === 0) {
    renderNoResults($main);
  } else {
    const $moreButton = Button("더 보기", "more", (event: MouseEvent) =>
      handleMoreMovies(event,movieService, fetchMoviesCallback)
    );
    $main.appendChild($moreButton);
  }

  if (
    movieList.movieList.length < 20 ||
    movieService.currentPage === MAXIMUM_PAGE
  ) {
    removeMoreButton($main);
  }
}