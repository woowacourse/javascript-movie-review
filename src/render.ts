import { Movie, MovieDetail, MovieListResponse } from "./type";
import { fetchMovieDetail } from "./api";
import { RATING_LABELS } from "./constants";
import { ratingStore } from "./rating";
import { showErrorToast } from "./toast";
import { setPage } from "./url";

function throttle<T extends (...args: any[]) => Promise<unknown> | void>(callback: T) {
  let inFlight: Promise<unknown> | null = null;

  return (...args: Parameters<T>): void => {
    if (inFlight) return;

    inFlight = Promise.resolve(callback(...args)).finally(() => {
      inFlight = null;
    });
  };
}

export function createMovieItemTemplate(movie: Movie): HTMLElement {
  const li = document.createElement("li");
  const item = document.createElement("div");
  item.className = "item";

  const img = document.createElement("img");
  img.className = "thumbnail";
  img.src = `${import.meta.env.VITE_IMAGE_BASE_URL}/w200${movie.poster_path}`;
  img.alt = movie.title;
  img.addEventListener("error", () => {
    img.src = "/images/default_movie_image.png";
  }, { once: true });
  item.addEventListener("click", () => {
    handleMovieClick(movie.id);
  });

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rateP = document.createElement("p");
  rateP.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = `${import.meta.env.BASE_URL}images/star_empty.png`;
  starImg.className = "star";

  const rateSpan = document.createElement("span");
  rateSpan.textContent = movie.vote_average.toFixed(1);

  rateP.appendChild(starImg);
  rateP.appendChild(rateSpan);

  const titleP = document.createElement("p");
  titleP.className = "movie-title";
  titleP.textContent = movie.title;

  itemDesc.appendChild(rateP);
  itemDesc.appendChild(titleP);
  item.appendChild(img);
  item.appendChild(itemDesc);
  li.appendChild(item);

  return li;
}

export function createSkeletonItemTemplate(): HTMLElement {
  const li = document.createElement("li");
  li.className = "skeleton-item";

  const item = document.createElement("div");
  item.className = "item";

  const thumbnail = document.createElement("div");
  thumbnail.className = "skeleton thumbnail";

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rate = document.createElement("p");
  rate.className = "rate";
  const rateBar = document.createElement("span");
  rateBar.className = "skeleton skeleton-rate";
  rate.appendChild(rateBar);

  const title = document.createElement("p");
  title.className = "movie-title";
  const titleBar = document.createElement("span");
  titleBar.className = "skeleton skeleton-title";
  title.appendChild(titleBar);

  itemDesc.appendChild(rate);
  itemDesc.appendChild(title);
  item.appendChild(thumbnail);
  item.appendChild(itemDesc);
  li.appendChild(item);

  return li;
}

function getResponsiveSkeletonCount(): number {
  if (window.matchMedia("(max-width: 767px)").matches) return 8;
  if (window.matchMedia("(max-width: 1023px)").matches) return 12;
  return 20;
}

export function renderSkeletonItems(length: number = getResponsiveSkeletonCount()) {
  const list = document.querySelector(".thumbnail-list");
  if (!list) return;
  Array.from({ length }).forEach(() => list.appendChild(createSkeletonItemTemplate()));
}

export function renderTopRatedMovie(movie: Movie) {
  const rateEl = document.querySelector(".top-rated-movie .rate-value");
  const titleEl = document.querySelector(".top-rated-movie .title");
  const detailButtonEl = document.querySelector<HTMLButtonElement>(
    ".top-rated-movie .detail",
  );
  const backgroundContainerEl = document.querySelector<HTMLDivElement>(
    ".background-container",
  );

  if (titleEl) {
    titleEl.textContent = movie.title;
  }

  if (rateEl) {
    rateEl.textContent = movie.vote_average.toFixed(1);
  }

  if (detailButtonEl) {
    detailButtonEl.disabled = false;
    detailButtonEl.onclick = () => handleMovieClick(movie.id);
  }

  if (backgroundContainerEl) {
    backgroundContainerEl.style.backgroundImage = `url(${import.meta.env.VITE_IMAGE_BASE_URL}/w1920_and_h800_multi_faces${movie.backdrop_path})`;
  }
}

export function renderMovies(movieList: Movie[]) {
  const list = document.querySelector(".thumbnail-list");
  if (!list) return;
  movieList.forEach((movie) => list.appendChild(createMovieItemTemplate(movie)));
}

export function updateEmptyListAlert() {
  const listEl = document.querySelector(".thumbnail-list");

  if (!listEl) return;

  if (listEl.children.length === 0) {
    listEl.insertAdjacentHTML(
      "afterend", `
        <div class="empty-list-alert">
          <img src="${import.meta.env.BASE_URL}svg/planet.svg" alt="행성이" />
          <p class="empty-list-message">검색 결과가 없습니다.</p>
        </div>
      `,
    );
  } else {
    document.querySelector('.empty-list-alert')?.remove();
  }
}

let scrollObserver: IntersectionObserver | null = null;

function setupInfiniteScroll(prevResponseList: MovieListResponse[], page: number, callback: () => void) {
  scrollObserver?.disconnect();
  scrollObserver = null;

  const hasMore =
    prevResponseList.length > 0 &&
    prevResponseList[prevResponseList.length - 1].total_pages > page;

  let sentinel = document.querySelector<HTMLElement>(".scroll-sentinel");

  if (hasMore) {
    if (!sentinel) {
      sentinel = document.createElement("div");
      sentinel.className = "scroll-sentinel";
      document.querySelector(".thumbnail-list")?.insertAdjacentElement("afterend", sentinel);
    }

    const throttledCallback = throttle(callback);
    scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        throttledCallback();
      }
    });
    scrollObserver.observe(sentinel);
  } else {
    sentinel?.remove();
  }
}

export function renderListTitle(query: string) {
  const listTitleEl = document.querySelector('.list-title');

  if (listTitleEl) {
    listTitleEl.textContent = `"${query}" 검색 결과`
  }
}

export function removeSkeletonItem() {
  document
    .querySelectorAll(".skeleton-item")
    .forEach((element) => element.remove());
}

export function removeTopRatedMovieSkeleton() {
  document.querySelectorAll(".top-rated-movie .skeleton")
    .forEach((element) => element.remove());
}

export async function renderMoviePage({
  page,
  prevResponseList,
  fetchFn,
  beforeFetch,
  afterRender,
  extraFinally,
  showMoreCallback,
}: {
  page: number;
  prevResponseList: MovieListResponse[];
  fetchFn: (startPage: number, page: number) => Promise<MovieListResponse[]>;
  beforeFetch?: () => void;
  afterRender?: () => void;
  extraFinally?: () => void;
  showMoreCallback: () => void;
}): Promise<void> {
  try {
    setPage(page);
    beforeFetch?.();
    renderSkeletonItems();

    const responseList = await fetchFn(prevResponseList.length, page);
    prevResponseList.push(...responseList);

    const movieList = responseList.reduce((arr: Movie[], response) => {
      return [...arr, ...response.results];
    }, []);

    renderMovies(movieList);
    afterRender?.();

    setupInfiniteScroll(prevResponseList, page, showMoreCallback);
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast({ title: error.name, message: error.message });
    }
  } finally {
    removeSkeletonItem();
    extraFinally?.();
  }
}

function closeMovieModal() {
  document.querySelector("#modalBackground")?.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function showModalLoading() {
  const modalContainer = document.querySelector<HTMLElement>(".modal-container");
  if (modalContainer) {
    modalContainer.classList.add("is-loading");
    modalContainer.innerHTML = '<div class="modal-spinner"></div>';
  }
  document.querySelector("#modalBackground")?.classList.add("active");
  document.body.classList.add("modal-open");
}

function formatRatingText(rating: number): string {
  return `${RATING_LABELS[rating] ?? ""} (${rating}/10)`;
}

function updateStarDisplay(buttons: NodeListOf<HTMLButtonElement>, rating: number | null) {
  buttons.forEach((btn) => {
    const value = Number(btn.dataset.value);
    const img = btn.querySelector<HTMLImageElement>(".star-icon");
    if (img) {
      img.src = rating !== null && value <= rating
        ? `${import.meta.env.BASE_URL}images/star_filled.png`
        : `${import.meta.env.BASE_URL}images/star_empty.png`;
    }
  });
}

function initStarRating(container: HTMLElement, movieId: number) {
  const buttons = container.querySelectorAll<HTMLButtonElement>(".star-btn");
  const ratingTextEl = container.querySelector(".rating-text");

  let savedRating = ratingStore.getRating(movieId);

  updateStarDisplay(buttons, savedRating);
  if (ratingTextEl) ratingTextEl.textContent = savedRating !== null ? (formatRatingText(savedRating)) : "";

  buttons.forEach((btn) => {
    const value = Number(btn.dataset.value);

    btn.addEventListener("mouseenter", () => {
      updateStarDisplay(buttons, value);
      if (ratingTextEl) ratingTextEl.textContent = formatRatingText(value);
    });

    btn.addEventListener("mouseleave", () => {
      updateStarDisplay(buttons, savedRating);
      if (ratingTextEl) ratingTextEl.textContent = savedRating !== null ? (formatRatingText(savedRating)) : "";
    });

    btn.addEventListener("click", () => {
      savedRating = value;
      ratingStore.setRating(movieId, value);
      updateStarDisplay(buttons, savedRating);
      if (ratingTextEl) ratingTextEl.textContent = formatRatingText(savedRating);
    });
  });
}

export function openMovieModal(movieDetail: MovieDetail) {
  const modalContainer = document.querySelector<HTMLElement>(".modal-container");
  if (!modalContainer) return;

  const year = movieDetail.release_date?.split("-")[0] ?? "";
  const genreText = movieDetail.genres.map((g) => g.name).join(", ");
  const starBtnsHtml = [2, 4, 6, 8, 10]
    .map((v) => `<button class="star-btn" data-value="${v}"><img class="star-icon" src="${import.meta.env.BASE_URL}images/star_empty.png" alt="${v}점" /></button>`)
    .join("");

  modalContainer.classList.remove("is-loading");
  modalContainer.innerHTML = `
    <div class="modal-image">
      <img alt="" />
    </div>
    <div class="modal-description">
      <h2></h2>
      <p class="category"></p>
      <div class="rate-row">
        <span class="rate-label">평균</span>
        <img src="${import.meta.env.BASE_URL}images/star_filled.png" class="star" />
        <span class="rate-value"></span>
      </div>
      <hr />
      <div class="rate-row my-rating">
        <span class="rate-label">내 별점</span>
        <div class="star-rating-row">
          <div class="star-rating">${starBtnsHtml}</div>
          <span class="rating-text"></span>
        </div>
      </div>
      <hr />
      <p class="detail-title">줄거리</p>
      <p class="detail"></p>
    </div>
  `;

  const imgEl = modalContainer.querySelector<HTMLImageElement>(".modal-image img");
  if (imgEl) {
    imgEl.src = `${import.meta.env.VITE_IMAGE_BASE_URL}/w500${movieDetail.poster_path}`;
    imgEl.alt = movieDetail.title;
    imgEl.addEventListener("error", () => { imgEl.src = `${import.meta.env.BASE_URL}images/default_movie_image.png`; }, { once: true });
  }

  const titleEl = modalContainer.querySelector("h2");
  if (titleEl) titleEl.textContent = movieDetail.title;

  const categoryEl = modalContainer.querySelector(".category");
  if (categoryEl) categoryEl.textContent = `${year} · ${genreText}`;

  const rateValueEl = modalContainer.querySelector(".rate-value");
  if (rateValueEl) rateValueEl.textContent = movieDetail.vote_average.toFixed(1);

  const detailEl = modalContainer.querySelector(".detail");
  if (detailEl) detailEl.textContent = movieDetail.overview;

  initStarRating(modalContainer, movieDetail.id);

  document.querySelector("#modalBackground")?.classList.add("active");
  document.body.classList.add("modal-open");
}

const handleMovieClick = throttle(async (movieId: number) => {
  showModalLoading();
  try {
    const movieDetail = await fetchMovieDetail(movieId);
    openMovieModal(movieDetail);
  } catch (error) {
    closeMovieModal();
    if (error instanceof Error) {
      showErrorToast({ title: error.name, message: error.message });
    }
  }
});

export function initModal() {
  document.querySelector("#closeModal")?.addEventListener("click", closeMovieModal);

  document.querySelector("#modalBackground")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeMovieModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMovieModal();
  });
}
