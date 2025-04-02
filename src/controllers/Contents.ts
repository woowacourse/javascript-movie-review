import MovieList from "../domains/MovieList.js";
import { MovieInfo } from "../../types/movieType.js";
import MovieItem from "../components/MovieItem.js";
import Skeleton from "../components/Skeleton.js";
import { openModal } from "./MovieDetailModalHandlers.js";
import { ObserverHTMLElement } from "./Main.ts";

function renderContentHeader($section: HTMLElement, contentTitle: string) {
  const existingHeader = $section.querySelector("h2");
  if (existingHeader) existingHeader.remove();

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section.prepend($h2); 
}

export function showSkeleton(count: number) {
  const $moviesContainer = document.getElementById("movies-container");
  const $listContainer = document.querySelector(".thumbnail-list") as HTMLElement;

  for (let index = 0; index < count; index++) {
    const skeleton = Skeleton();
    $listContainer?.appendChild(skeleton);
  }
  $moviesContainer?.appendChild($listContainer);
}

export function replaceSkeletonWithMovies(movies: MovieInfo[]) {
  const $skeletonContainers = document.querySelectorAll(".skeletonContainer");
  const $thumbnailList = document.querySelector(".thumbnail-list");
  $skeletonContainers.forEach(($skeletonContainer) => {
    $skeletonContainer.remove();
  });
  movies.forEach((movie) => {
    const $movieItem = MovieItem(movie, openModal);
    $thumbnailList?.appendChild($movieItem);
  })
}

function renderNoResults($main: HTMLElement) {
  const existingContentContainer = document.querySelector(".contentContainer");
  if (existingContentContainer) {
    existingContentContainer.remove();
  }
  const $contentContainer = document.createElement("div");
  $contentContainer.classList.add("contentContainer");
  $contentContainer.innerHTML = `
        <img src="/images/no_results.png" alt="검색 결과 없음">
        <div>검색 결과가 없습니다.</div>
    `;
  $main.appendChild($contentContainer);
}

function removeNoResults() {
  const $contentContainer = document.querySelector(".contentContainer");
  if ($contentContainer) $contentContainer.remove();
  
}

export function ContentsContainer(contentTitle: string, movieList:MovieList) {
  const $main = document.querySelector("main") as HTMLElement;
  const $thumbnailList = document.querySelector(".thumbnail-list")?.children;

  renderContentHeader($main, contentTitle);
  replaceSkeletonWithMovies(movieList.movieList);

  if (movieList.movieList.length === 0 && $thumbnailList?.length === 0) {
    renderNoResults($main);
  } else {
    removeNoResults()
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