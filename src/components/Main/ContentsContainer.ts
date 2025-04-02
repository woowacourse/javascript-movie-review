import { MovieInfo } from "../../../types/movieType";
import DetailMovieService from "../../services/DetailMovieService";
import MovieService from "../../services/MovieService";
import SearchMovieService from "../../services/SearchMovieService";
import { hideSkeleton, showSkeleton } from "../Skeleton/showSkeleton";
import MovieList from "./MovieList";

export async function ContentsContainer(
  results: MovieInfo[],
  contentTitle: string
) {
  const $main = document.querySelector("main");
  const $section = document.querySelector("section");

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section?.appendChild($h2);

  const $listContainer = document.createElement("ul");
  $listContainer.classList.add("thumbnail-list");

  const movieList = new MovieList(results);
  const $movieList = movieList.renderMovieList();
  $movieList.forEach((movie) => $listContainer.appendChild(movie));
  $section?.appendChild($listContainer);
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
  searchMovieService: SearchMovieService,
  contentTitle: string,
  observer: IntersectionObserver
) {
  const isSearchMode = contentTitle.includes('"');
  showSkeleton(20, "section");
  let additionalData;
  if (isSearchMode) {
    const searchQuery = contentTitle
      .replace(/['"]/g, "")
      .replace(" 검색 결과", "");
    searchMovieService.nextPage();
    additionalData = await searchMovieService.getSearchResult(searchQuery);
  } else {
    movieService.nextPage();
    additionalData = await movieService.getPopularMovies();
  }

  hideSkeleton();

  const movieList = new MovieList(additionalData.results);
  const $movieList = movieList.renderMovieList();
  const $listContainer = document.querySelector(".thumbnail-list");
  $movieList.forEach((movie) => $listContainer?.appendChild(movie));

  const $newThumbnails = $listContainer?.querySelectorAll(".thumbnail");
  $newThumbnails?.forEach(($thumbnail) => {
    $thumbnail.addEventListener("click", async () => {
      await handleThumbnailClick($thumbnail as HTMLElement);
    });
  });

  if (
    additionalData.results.length === 0 ||
    movieService.getCurrentPage() === additionalData.total_pages
  ) {
    observer.disconnect();
    return;
  }
}

// 썸네일 클릭 시 모달 이벤트
async function handleThumbnailClick(thumbnailElement: HTMLElement) {
  const id = thumbnailElement.dataset.id;
  if (id) {
    const movieDetails = await DetailMovieService.getMovieDetails(Number(id));
    const event = new CustomEvent("modalOpenClicked", {
      detail: movieDetails,
    });
    document.dispatchEvent(event);
  }
}
