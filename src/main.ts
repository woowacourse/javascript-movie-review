import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie-list";
import { createButton } from "./components/button";

const dummyMovies = Array.from({ length: 20 }, (_, i) => ({
  title: `영화 ${i + 1}`,
  imageSrc:
    "https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg",
  rating: 7.7,
}));

addEventListener("load", () => {
  const headerEl = document.querySelector("header");
  const heroEl = document.querySelector("#hero");
  const mainEl = document.querySelector("#main");

  if (!headerEl || !heroEl || !mainEl) return;

  const searchForm = createSearchForm();
  headerEl.appendChild(searchForm);

  const hero = createHero({
    backgroundImageUrl:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {
      console.log("자세히 보기 클릭");
    },
  });
  heroEl.appendChild(hero);

  const movieList = createMovieList(dummyMovies);
  const moreButton = createButton("more", "더 보기", () => {});
  mainEl.append(movieList, moreButton);
});
