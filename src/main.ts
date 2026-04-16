import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createSkeleton } from "./components/skeleton";
import { Modal } from "./components/modal/modal";
import { renderPopularMovieList } from "./features/popular";
import { handleSearch } from "./features/search";
import { IMAGE_BASE_URL } from "./utils/constants";
import { RatingRepository } from "./types/ratingRepository";
import { LocalStorageRatingRepository } from "./repositories/localStorageRatingRepository";
import { createOnMovieClick } from "./features/createOnMovieClick";
import { createInfiniteScrollController } from "./utils/infiniteScroll";

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;
  const titleEl = document.querySelector(".main-title")!;

  const ratingRepo: RatingRepository = new LocalStorageRatingRepository();
  const modal = new Modal(ratingRepo);
  const onMovieClick = createOnMovieClick(modal);
  const scrollController = createInfiniteScrollController();

  // 히어로 배너 렌더링
  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
  });
  heroEl.appendChild(hero);

  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);

  const skeletonEls = createSkeleton();
  mainEl.appendChild(skeletonEls);

  await renderPopularMovieList(mainEl, skeletonEls, onMovieClick, scrollController);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    await handleSearch(query, mainEl, titleEl, onMovieClick, scrollController);
  });
});
