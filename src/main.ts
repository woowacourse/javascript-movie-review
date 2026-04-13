import { createSearchForm } from "./components/search-form";
import { createHero } from "./components/hero";
import { createSkeleton } from "./components/skeleton";
import { Modal } from "./components/modal/modal";
import { renderPopularMovieList } from "./features/popular";
import { handleSearch } from "./features/search";
import { fetchMovieDetail } from "./api/movieApi";
import { IMAGE_BASE_URL } from "./utils/constants";
import { RatingRepository } from "./types/ratingRepository";
import { LocalStorageRatingRepository } from "./repositories/localStorageRatingRepository";

addEventListener("load", async () => {
  const headerEl = document.querySelector("header")!;
  const heroEl = document.querySelector("#hero")!;
  const mainEl = document.querySelector("#main")!;
  const titleEl = document.querySelector(".main-title")!;

  const ratingRepo: RatingRepository = new LocalStorageRatingRepository();
  const modal = new Modal(ratingRepo);

  // 카드 클릭 이벤트 핸들러
  const onMovieClick = async (id: number) => {
    try {
      const detail = await fetchMovieDetail(id);
      modal.open({
        id: detail.id,
        title: detail.title,
        posterPath: detail.poster_path,
        releaseYear: detail.release_date.slice(0, 4),
        genres: detail.genres.map((g) => g.name),
        rating: detail.vote_average,
        overview: detail.overview,
      });
    } catch (error) {
      alert(`영화 상세 정보를 불러오는 데 실패했습니다. ${error}`);
    }
  };

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

  let stopInfiniteScroll = await renderPopularMovieList(
    mainEl,
    skeletonEls,
    onMovieClick,
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    stopInfiniteScroll();
    stopInfiniteScroll = await handleSearch(
      query,
      mainEl,
      titleEl,
      onMovieClick,
    );
  });
});
