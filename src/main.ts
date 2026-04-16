import { fetchMoviesDetail, fetchPopularMovies } from "./api/fetchMovies";
import { mapToThumbnailInfo } from "./utils/mapToThumbnailInfo";
import { renderSkeleton, removeSkeleton } from "./render/skeleton";
import { renderMoviesList } from "./render/movieList";
import { renderTopRatedMovie } from "./render/banner";
import { getYear } from "./utils/getYear";
import SearchForm from "./components/SearchForm";
import Logo from "./components/Logo";
import Modal from "./components/modal";
import Review from "./components/review";
import { LocalRatingStorage } from "./storage/RatingStorage";

import PageStore from "./store";
import MovieItem from "./components/MovieItem";

const searchForm = new SearchForm();
const logo = new Logo(resetToPopularView);
const modal = new Modal();
const review = new Review(new LocalRatingStorage());
const movieItem = new MovieItem(async (movieId: string) => {
  try {
    modal.openEmpty();
    const movieDetail = await fetchMoviesDetail(Number(movieId));

    modal.fill({
      title: movieDetail.title,
      overview: movieDetail.overview,
      voteAverage: movieDetail.vote_average,
      posterPath: `https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`,
      categoryText: `${getYear(movieDetail.release_date)} · ${movieDetail.genres.map((genre: { name: string }) => genre.name).join(", ")}`,
    });
    review.load(Number(movieId));
  } catch (error) {
    modal.close();
    alert("영화 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
});

function bindComponentEvents() {
  searchForm.bindEvent();
  logo.bindEvent();
  movieItem.bindEvent();
  modal.bindEvent();
  review.bindEvent();
}

function restorePopularViewUI() {
  const backgroundContainer = document.querySelector(".background-container");
  const sectionTitle = document.querySelector(".section-title");
  const notFoundContainer = document.querySelector(
    ".not-search-found-container",
  );

  if (backgroundContainer instanceof HTMLDivElement) {
    backgroundContainer.style.display = "flex";
  }

  if (sectionTitle) {
    sectionTitle.textContent = "지금 인기 있는 영화";
  }

  notFoundContainer?.remove();
}

async function resetToPopularView() {
  try {
    PageStore.setPopularMode();

    restorePopularViewUI();
    renderSkeleton();

    const movies = await onLoadNextPage(PageStore.page);
    const thumbnails = mapToThumbnailInfo(movies);

    const loadMore = async () => {
      if (PageStore.page >= PageStore.totalPages) return;
      try {
        renderSkeleton();
        const movies = await onLoadNextPage(PageStore.page + 1);
        removeSkeleton();
        if (!movies.length) return;
        renderMoviesList(movies, { append: true }, loadMore);
      } catch (error) {
        alert(
          "영화 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      } finally {
        removeSkeleton();
      }
    };

    renderMoviesList(movies, { append: false }, loadMore);

    renderTopRatedMovie(thumbnails[0]);
  } catch (error) {
    console.error(error);
    alert("영화 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
  } finally {
    removeSkeleton();
  }
}

async function onLoadNextPage(page: number) {
  const { movies, nowPage, totalPages } = await fetchPopularMovies(page);

  PageStore.page = nowPage;
  PageStore.totalPages = totalPages;

  return movies;
}

async function bootstrap() {
  bindComponentEvents();
  await resetToPopularView();
}

await bootstrap();
