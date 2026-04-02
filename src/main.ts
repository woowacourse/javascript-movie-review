import logoSrc from "../templates/images/logo.png";
import woowacourseLogoSrc from "../templates/images/woowacourse_logo.png";

import { createLogo } from "./components/logo";
import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createMovieList } from "./components/movie-list";
import { createMoreButton } from "./components/more-button";
import { createFooter } from "./components/footer";

const dummyMovies = Array.from({ length: 20 }, (_, i) => ({
  title: `영화 ${i + 1}`,
  imageSrc:
    "https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg",
  rating: 7.7,
}));

addEventListener("load", () => {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = "";

  const header = document.createElement("header");
  const logo = createLogo(logoSrc);
  const searchForm = createSearchForm();
  header.append(logo, searchForm);

  const hero = createHero({
    backgroundImageUrl:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {
      console.log("자세히 보기 클릭");
    },
  });

  const main = document.createElement("main");
  const movieList = createMovieList({
    sectionTitle: "지금 인기 있는 영화",
    movies: dummyMovies,
  });
  const moreButton = createMoreButton(() => {
    console.log("더 보기 클릭");
  });
  main.append(movieList, moreButton);

  const footer = createFooter(woowacourseLogoSrc);

  app.append(header, hero, main, footer);
});
