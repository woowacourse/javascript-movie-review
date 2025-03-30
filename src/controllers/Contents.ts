import MovieList from "../domains/MovieList.js";
import { MovieInfo } from "../../types/movieType.js";
import MovieItem from "../components/MovieItem.js";
import Skeleton from "../components/Skeleton.js";
import { openModal } from "./MovieDetailModalHandlers.js";
import { ObserverHTMLElement } from "./Main.js";

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
    const $movieItem = MovieItem(movie, openModal);
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

export function ContentsContainer(contentTitle: string, movieList:MovieList) {
  const $main = document.querySelector("main") as HTMLElement;

  renderContentHeader($main, contentTitle);
  replaceSkeletonWithMovies(movieList.movieList);
  removeMoreButton($main);

  if (movieList.movieList.length === 0) {
    renderNoResults($main);
  }

  if (movieList.movieList.length < 20) {
      const sentinel = document.getElementById(
        "sentinel"
      ) as ObserverHTMLElement;
      if (sentinel && sentinel.observer) {
        sentinel.observer.disconnect();
      }
  }
}