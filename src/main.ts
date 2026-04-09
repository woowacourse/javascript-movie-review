import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie";
import { createButton } from "./components/button";
import { apiRequest } from "./utils/api";
import { MovieResponse } from "./types/api";
import { IMAGE_BASE_URL } from "./utils/constants";
import { createSkeleton } from "./components/skeleton";

let page = 1;

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;
  const titleEl = document.querySelector(".main-title")!;

  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

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
  });

  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {},
  });
  heroEl.appendChild(hero);

  const skeletons = createSkeleton();
  mainEl.appendChild(skeletons);

  const data = await apiRequest<MovieResponse>({
    url: `/movie/popular?language=ko-KR&page=${page}`,
    method: "GET",
  });
  const movieList = createMovieList(data.results);

  const moreButton = createButton("more", "더 보기", async () => {
    page++;
    moreButton.disabled = true;

    const skeletons = createSkeleton();
    mainEl.append(skeletons, moreButton);

    const data = await apiRequest<MovieResponse>({
      url: `/movie/popular?language=ko-KR&page=${page}`,
      method: "GET",
    });
    if (data) moreButton.disabled = false;

    const newMovieList = createMovieList(data.results);
    skeletons.replaceWith(newMovieList);
    mainEl.append(moreButton);
  });

  skeletons.replaceWith(movieList, moreButton);
});
