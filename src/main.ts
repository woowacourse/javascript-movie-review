import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie";
import { createButton } from "./components/button";
import { apiRequest } from "./utils/api";
import { MovieResponse } from "./types/api";
import { IMAGE_BASE_URL } from "./utils/constants";
import { createSkeleton } from "./components/skeleton";

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;
  const titleEl = document.querySelector(".main-title")!;

  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);

  const moreButton = createButton("more", "더 보기");
  const skeletonEls = createSkeleton();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let page = 1;

    const params = new URLSearchParams();
    const query = input.value.trim();

    if (!query) return;

    params.set("query", query);
    history.pushState({}, "", `/search?${params.toString()}`);

    const data = await apiRequest<MovieResponse>({
      url: `/search/movie?language=ko-KR&query=${query}&page=${page}`,
      method: "GET",
    });

    titleEl.textContent = `"${query}" 검색 결과`;
    mainEl.innerHTML = "";
    mainEl.appendChild(titleEl);

    if (data.results.length === 0) {
      const noSearchResultEl = document.createElement("p");
      noSearchResultEl.textContent = "검색 결과가 없습니다.";
      noSearchResultEl.className = "no-search-result";
      mainEl.appendChild(noSearchResultEl);
      return;
    }

    if (data.results.length > 0) {
      const searchResult = createMovieList(data.results);
      mainEl.append(searchResult, moreButton);
    }

    moreButton.onclick = () => {
      page++;
      createLoadMoreHandler(
        `/search/movie?language=ko-KR&query=${query}&page=${page}`,
        moreButton,
        mainEl,
        skeletonEls,
      );
    };
  });

  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {},
  });
  heroEl.appendChild(hero);

  renderPopularMovieList(moreButton, mainEl, skeletonEls);

  mainEl.appendChild(skeletonEls);
});

// 인기 영화 목록을 불러와서 렌더링하는 함수
const renderPopularMovieList = async (
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
) => {
  let page = 1;

  const data = await apiRequest<MovieResponse>({
    url: `/movie/popular?language=ko-KR&page=${page}`,
    method: "GET",
  });
  const movieList = createMovieList(data.results);
  skeletonEls.replaceWith(movieList, loadMoreBtnEl);

  loadMoreBtnEl.onclick = () => {
    page++;

    createLoadMoreHandler(
      `/movie/popular?language=ko-KR&page=${page}`,
      loadMoreBtnEl,
      mainEl,
      skeletonEls,
    );
  };
};

// Load More 버튼 클릭 시 추가 영화 데이터를 불러오는 핸들러
const createLoadMoreHandler = async (
  url: string,
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
) => {
  loadMoreBtnEl.disabled = true;

  mainEl.append(skeletonEls, loadMoreBtnEl);

  const data = await apiRequest<MovieResponse>({
    url: url,
    method: "GET",
  });
  if (data) loadMoreBtnEl.disabled = false;

  const newMovieList = createMovieList(data.results);
  skeletonEls.replaceWith(newMovieList);
  mainEl.append(loadMoreBtnEl);
};
