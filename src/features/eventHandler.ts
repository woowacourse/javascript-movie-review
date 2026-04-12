import { movieState } from "./movieState";
import {
  initialRender,
  renderMoreMovies,
  renderSearchResults,
  renderMovieDetailModal
} from "./movieController";
import { Header } from "./View/Header";

export function initEvents() {
  loadHeader();

  loadSearch();

  loadMoreButton();

  loadMovieDetailInfo();
}

function loadHeader() {
  const header = document.querySelector(".header") as HTMLElement;

  header.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page);
    }
  });
}

function loadSearch() {
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;
  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    movieState.page = 1;
    movieState.searchQuery = Header.getSearchInputValue();

    if (movieState.searchQuery === "") {
      await initialRender(movieState.page);
      return;
    }

    await renderSearchResults(movieState.page, movieState.searchQuery);
  });
}

function loadMoreButton() {
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
  if (moreButton) {
    moreButton.addEventListener("click", async () => {
      movieState.page += 1;
      await renderMoreMovies(movieState.page, movieState.searchQuery);
    });
  }
}

// 하나의 영화 카드를 클릭했을 때, 해당 카드에서 영화의 id를 받아서 
// 그 id를 그 영화 정보를 렌더링 하는 함수로 넘겨준다. -> 렌더링 한다.
function loadMovieDetailInfo() {
  const movieList = document.querySelector(".thumnail-list") as HTMLElement;
  if(movieList){
    movieList.addEventListener("click", async () => {
      const target = movieList.closest(".movie-card") as HTMLElement;
      const id  = target.dataset.id;
       if(id){
          await renderMovieDetailModal(Number(id));
        }
    })
  }
}