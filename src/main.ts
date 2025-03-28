import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import { MovieInfo } from "../types/movieType.ts";
import ContentsContainer from "./components/Main/ContentsContainer.ts";
import MovieService from "./services/MovieService.ts";
import LogoSearchBar from "./components/Header/LogoSearchBar.js";
import HeaderSkeleton from "./components/Skeleton/HeaderSkeleton.js";
import {
  hideSkeleton,
  showSkeleton,
} from "./components/Skeleton/showSkeleton.ts";
import { Modal } from "./components/Modal/Modal.js";
import openModal from "./components/Modal/openModal.ts";

function renderHeader({
  id,
  title,
  backdrop_path,
  poster_path,
  overview,
  vote_average,
}: MovieInfo) {
  const $container = document.querySelector("#wrap");
  const $header = Header({
    title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
  });
  const $logoSearchBar = LogoSearchBar();
  $header.querySelector(".top-rated-container")?.prepend($logoSearchBar);
  const $headerSkeleton = document
    .querySelector("header .skeleton-background")
    ?.closest("header");
  if ($headerSkeleton) {
    $headerSkeleton.remove();
  }

  $container?.prepend($header);
  const $openModalButton = $header.querySelector(".detail");
  if ($openModalButton) {
    $openModalButton.addEventListener("click", async () => {
      const movieService = new MovieService();
      const movieDetails = await movieService.getMovieDetails(id);
      const event = new CustomEvent("modalOpenClicked", {
        detail: movieDetails,
      });
      document.dispatchEvent(event);
    });
  }
}

document.addEventListener("modalOpenClicked", (event: CustomEvent) => {
  const customEvent = event as CustomEvent<MovieInfo>;

  const { title, release_date, genres, poster_path, vote_average, overview } =
    customEvent.detail;
  openModal({
    title,
    release_date,
    genres,
    poster_path,
    vote_average,
    overview,
  });
});

async function renderContent(movieService: MovieService, results: MovieInfo[]) {
  ContentsContainer(results, "지금 인기 있는 영화");

  // 이벤트 등록
  const $input = document.querySelector(".search-input") as HTMLInputElement;
  const $button = document.querySelector(".search-button") as HTMLButtonElement;
  const $section = document.querySelector("section") as HTMLDivElement;

  $input?.addEventListener("keydown", async (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Enter" && !event.isComposing) {
      const inputValue = (event.target as HTMLInputElement).value;
      showSkeleton(20, "section");
      if (inputValue === "") {
        alert("검색어를 입력해주세요.");
      } else {
        const searchResult = await movieService.getSearchResult(inputValue);
        if ($section) {
          $section.innerHTML = "";
        }

        ContentsContainer(searchResult.results, `"${inputValue}" 검색 결과`);
      }
    }
  });

  $button?.addEventListener("click", async () => {
    const inputValue = $input?.value;
    showSkeleton(20, "section");
    if (inputValue === "") {
      alert("검색어를 입력해주세요.");
    } else {
      const searchResult = await movieService.getSearchResult(inputValue);
      if ($section) {
        $section.innerHTML = "";
      }

      ContentsContainer(searchResult.results, `"${inputValue}" 검색 결과`);
    }
  });
}

function renderFooter() {
  const $container = document.querySelector("#wrap");
  const $footer = Footer();
  $container?.appendChild($footer);
}

async function main() {
  const movieService = new MovieService();
  const $container = document.querySelector("#wrap");

  const $headerSkeleton = HeaderSkeleton();
  $container?.prepend($headerSkeleton);

  showSkeleton(20, "section");

  const data = await movieService.getPopularMovies();

  renderHeader(data.results[0]);

  hideSkeleton();

  renderContent(movieService, data.results);

  renderFooter();
}

main();
