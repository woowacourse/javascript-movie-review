import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import { MovieInfo } from "../types/movieType.ts";
import ContentsContainer from "./components/Main/ContentsContainer.ts";
import MovieService from "./services/MovieService.ts";
import LogoSearchBar from "./components/Header/LogoSearchBar.js";

function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const $container = document.querySelector("#wrap");

  const $header = Header({ title, poster_path, vote_average });
  const $logoSearchBar = LogoSearchBar();
  $header.querySelector(".top-rated-container")?.prepend($logoSearchBar);

  $container?.prepend($header);
}

async function renderContent(movieService: MovieService, results: MovieInfo[]) {
  // 이벤트 등록
  const $input = document.querySelector(".search-input") as HTMLInputElement;
  const $button = document.querySelector(".search-button") as HTMLButtonElement;
  const $section = document.querySelector("section") as HTMLDivElement;
  // 컨텐츠 컨테이너
  ContentsContainer(results, "지금 인기 있는 영화");

  $input?.addEventListener("keydown", async (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;

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
  const data = await movieService.getPopularMovies();

  renderHeader(data.results[0]);

  renderContent(movieService, data.results);

  renderFooter();
}

main();
