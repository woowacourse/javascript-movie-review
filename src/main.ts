import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createButton } from "./components/button";
import { createSkeleton } from "./components/skeleton";
import { renderPopularMovieList } from "./features/popular";
import { handleSearch } from "./features/search";
import { IMAGE_BASE_URL } from "./utils/constants";

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;
  const titleEl = document.querySelector(".main-title")!;

  // 히어로 배너 렌더링
  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2",
    onDetailClick: () => {},
  });
  heroEl.appendChild(hero);

  // 검색 폼 렌더링
  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);

  const loadMoreBtnEl = createButton("more", "더 보기");
  const skeletonEls = createSkeleton();

  mainEl.appendChild(skeletonEls); // 초기 로딩 시 스켈레톤 렌더링
  renderPopularMovieList(loadMoreBtnEl, mainEl, skeletonEls); // 인기 영화 목록 렌더링

  // 검색 폼 제출 이벤트 핸들러 등록
  form.addEventListener(
    "submit",
    handleSearch(input, loadMoreBtnEl, mainEl, titleEl, skeletonEls),
  );
});
