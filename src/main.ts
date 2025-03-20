import Footer from "./components/Footer";
import Header from "./components/Header";
import { MovieInfo } from "../types/movieType.ts";
import ContentsContainer from "./components/ContentsContainer.ts";
import MovieService from "./services/MovieService.ts";

async function getPopularMovies() {
  const movieService = new MovieService();
  const data = await movieService.getPopularMovies();
  // 헤더 렌더링
  renderHeader(data.results[0]);

  // 이벤트 등록
  const $input = document.querySelector(".search-input");
  const $button = document.querySelector(".search-button");
  const $section = document.querySelector("section") as HTMLDivElement;

  $input?.addEventListener("keydown", async (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;
      const searchResult = await movieService.getSearchResult(inputValue);
      if ($section) {
        $section.innerHTML = "";
      }
      console.log(document.querySelector("main"));
      ContentsContainer(searchResult.results, `"${inputValue}" 검색 결과`);
    }
  });

  $button?.addEventListener("click", async (event) => {
    const inputValue = $input?.value;
    const searchResult = await movieService.getSearchResult(inputValue);
    if ($section) {
      $section.innerHTML = "";
    }
    ContentsContainer(searchResult.results, `"${inputValue}" 검색 결과`);
  });

  // 컨텐츠 컨테이너
  ContentsContainer(data.results, "지금 인기 있는 영화");
}

function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const $container = document.querySelector("#wrap");
  const $header = Header({ title, poster_path, vote_average });

  $container?.prepend($header);
}

function renderFooter() {
  const $container = document.querySelector("#wrap");
  const $footer = Footer();
  $container?.appendChild($footer);
}

getPopularMovies();

renderFooter();
