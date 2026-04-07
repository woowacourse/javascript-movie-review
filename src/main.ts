import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie";
import { createButton } from "./components/button";
import { apiRequest } from "./utils/api";
import { PopularMovieResponse } from "./types/api";
import { IMAGE_BASE_URL } from "./utils/constants";
import { createSkeleton } from "./components/skeleton";

let page = 1;

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;

  const searchForm = createSearchForm();
  headerEl.appendChild(searchForm);

  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {},
  });
  heroEl.appendChild(hero);

  const skeletons = createSkeleton();
  mainEl.appendChild(skeletons);

  const data = await apiRequest<PopularMovieResponse>({
    url: `/movie/popular?language=ko-KR&page=${page}`,
    method: "GET",
  });
  const movieList = createMovieList(data.results);

  const moreButton = createButton("more", "더 보기", async () => {
    page++;
    moreButton.disabled = true;

    const skeletons = createSkeleton();
    mainEl.append(skeletons, moreButton);

    const data = await apiRequest<PopularMovieResponse>({
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
