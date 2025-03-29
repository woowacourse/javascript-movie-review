import { MovieInfo } from "../../../types/movieType";
import MovieService from "../../services/MovieService";
import { hideSkeleton, showSkeleton } from "../Skeleton/showSkeleton";
import MovieList from "./MovieList";

const MAXIMUM_PAGE = 500;

export async function ContentsContainer(
  results: MovieInfo[],
  contentTitle: string
) {
  const $main = document.querySelector("main");
  const $section = document.querySelector("section");

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section?.appendChild($h2);

  const movieList = new MovieList(results);
  const $movieList = movieList.renderMovieList();
  $section?.appendChild($movieList);
  const $thumbnails = document.querySelectorAll(".thumbnail");
  $thumbnails.forEach(($thumbnail) => {
    $thumbnail.addEventListener("click", async () => {
      await handleThumbnailClick($thumbnail as HTMLElement);
    });
  });
  hideSkeleton();
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
  }
}

// 무한 스크롤 시 추가 데이터 로드
export async function handleAdditionalData(
  movieService: MovieService,
  contentTitle: string,
  observer: IntersectionObserver
) {
  const $section = document.querySelector("section");
  const isSearchMode = contentTitle.includes('"');
  movieService.nextPage();
  showSkeleton(20, "section");
  let additionalData;
  if (isSearchMode) {
    const searchQuery = contentTitle
      .replace(/['"]/g, "")
      .replace(" 검색 결과", "");
    additionalData = await movieService.getSearchResult(searchQuery);
  } else {
    additionalData = await movieService.getPopularMovies();
  }

  hideSkeleton();

  if (
    additionalData.results.length === 0 ||
    movieService.getCurrentPage() >= MAXIMUM_PAGE
  ) {
    observer.disconnect();
    return;
  }

  const movieList = new MovieList(additionalData.results);
  const $movieList = movieList.renderMovieList();
  $section?.appendChild($movieList);

  const $newThumbnails = $movieList.querySelectorAll(".thumbnail");
  $newThumbnails.forEach(($thumbnail) => {
    $thumbnail.addEventListener("click", async () => {
      await handleThumbnailClick($thumbnail as HTMLElement);
    });
  });
}

// 썸네일 클릭 시 모달 이벤트
async function handleThumbnailClick(thumbnailElement: HTMLElement) {
  const id = thumbnailElement.dataset.id;
  if (id) {
    const movieService = new MovieService();
    const movieDetails = await movieService.getMovieDetails(Number(id));
    const event = new CustomEvent("modalOpenClicked", {
      detail: movieDetails,
    });
    document.dispatchEvent(event);
  }
}
