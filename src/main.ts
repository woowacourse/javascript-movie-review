import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie";
import { createButton } from "./components/button";
import { apiRequest } from "./utils/api";
import { PopularMovieResponse } from "./types/api";
import { IMAGE_BASE_URL } from "./utils/constants";

addEventListener("load", async () => {
  const headerEl = document.querySelector("header");
  const heroEl = document.querySelector("#hero");
  const mainEl = document.querySelector("#main");

  if (!headerEl || !heroEl || !mainEl) return;

  const searchForm = createSearchForm();
  headerEl.appendChild(searchForm);

  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {
      console.log("자세히 보기 클릭");
    },
  });
  heroEl.appendChild(hero);

  const data = await apiRequest<PopularMovieResponse>({
    url: "/movie/popular?language=en-US&page=1",
    method: "GET",
  });

  console.log("data", data);

  const movieList = createMovieList(data.results);
  const moreButton = createButton("more", "더 보기", () => {});
  mainEl.append(movieList, moreButton);
});
