import { ERROR, FETCH_OPTION, FETCH_TIMEOUT_MS, SHOW_MORE_THROTTLE_MS } from "./constants";
import { APIError, UnknownError } from "./error";
import { showErrorToast } from "./toast";
import { Movie, MovieListResponse, TMDBAPIEndpoint } from "./type";

export function getParamFromURL(name: string, defaultValue: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) ?? defaultValue
}

export function getQuery() {
  return getParamFromURL("query", "");
}

export function getPage() {
  const pageStr = getParamFromURL("page", "1");
  const page = isNaN(Number(pageStr)) ? 1 : Number(pageStr);
  return Math.max(1, page);
}

export function setQuery(query: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("query", query);
  window.history.replaceState({}, "", url);
}

export function setPage(page: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.replaceState({}, "", url);
}

export function throttle<T extends (...args: any[]) => void>(callback: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) return;

    callback(...args);

    timer = setTimeout(() => {
      timer = null;
    }, ms);
  };
};

export function handleError(catchedError: unknown): void {
  const error = catchedError instanceof Error ? catchedError : new UnknownError("에러 객체를 찾을 수 없습니다.");
  const title = (error.name in ERROR) ? ERROR[error.name as keyof typeof ERROR] : error.name;
  const message = error.message ?? "에러 메시지가 없습니다.";
  showErrorToast({ title, message });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetcher<T>(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new APIError('API 응답이 올바르지 않습니다.')
  }

  return response.json() as Promise<T>
}

export async function fetchMovies(endpoint: "/search/movie", params: { query: string, page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: "/movie/popular", params: { page: number }): Promise<MovieListResponse>
export async function fetchMovies(endpoint: TMDBAPIEndpoint, params: Record<string, any>): Promise<MovieListResponse> {
  const queryParams = new URLSearchParams({
    language: "ko-KR",
    ...params
  });

  try {
    const fetchPromise = fetcher<MovieListResponse>(`${import.meta.env.VITE_API_BASE_URL}${endpoint}?${queryParams}`, FETCH_OPTION);
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new APIError(`API 응답 시간이 ${FETCH_TIMEOUT_MS}ms를 초과했습니다.`));
      }, FETCH_TIMEOUT_MS);
    })

    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    throw (error instanceof Error) ? error : new APIError('API 요청중 에러가 발생했습니다.')
  }
}

export async function fetchPopularMoviesByPageRange(startPage: number, endPage: number) {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);
      return fetchMovies('/movie/popular', { page: startPage + index + 1 });
    },
  );

  return Promise.all(promises);
}

export async function fetchSearchMoviesByPageRange(startPage: number, endPage: number, query: string) {
  const promises = Array.from({ length: endPage - startPage }).map(
    async (_, index) => {
      if (index !== 0) await delay(index * 200);
      return fetchMovies('/search/movie', { query, page: startPage + index + 1 })
    },
  );

  return Promise.all(promises);
}

export function createMovieItemTemplate(movie: Movie): string {
  return `
    <li>
      <div class="item">
        <img
          class="thumbnail"
          src="${import.meta.env.VITE_IMAGE_BASE_URL}/w200${movie.poster_path}"
          onerror="this.src='/images/default_movie_image.png'"
          alt="${movie.title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="${import.meta.env.BASE_URL}images/star_empty.png" alt="empty star" class="star" />
            <span>${movie.vote_average.toFixed(1)}</span>
          </p>
          <p class="movie-title">${movie.title}</p>
        </div>
      </div>
    </li>
  `
}

export function createSkeletonItemTemplate(): string {
  return `
    <li class="skeleton-item">
      <div class="item">
        <div class="skeleton thumbnail"></div>
        <div class="item-desc">
          <div class="skeleton skeleton-rate"></div>
          <div class="skeleton skeleton-title"></div>
        </div>
      </div>
    </li>
  `
}

export function createSkeletonItemsTemplate(count: number): string {
  return Array.from({ length: count }).map(createSkeletonItemTemplate).join("");
}

export function renderSkeletonItems(length: number) {
  document.querySelector(".thumbnail-list")?.insertAdjacentHTML("beforeend", createSkeletonItemsTemplate(length));
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
    rateEl.textContent =
      movie.vote_average.toFixed(1);
  }

  if (detailButtonEl) {
    detailButtonEl.disabled = false;
  }

  if (backgroundContainerEl) {
    backgroundContainerEl.style.backgroundImage = `url(${import.meta.env.VITE_IMAGE_BASE_URL}/w1920_and_h800_multi_faces${movie.backdrop_path})`;
  }
}

export function renderMovies(movieList: Movie[]) {
  document.querySelector(".thumbnail-list")?.insertAdjacentHTML(
    "beforeend",
    movieList.map((movie) => createMovieItemTemplate(movie)).join(""),
  );
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

export function renderShowMoreButton(prevResponseList: MovieListResponse[], page: number, callback: () => void) {
  if (
    prevResponseList.length &&
    prevResponseList[prevResponseList.length - 1].total_pages > page
  ) {
    if (!document.querySelector(".show-more-button")) {
      const button = document.createElement("button");
      button.classList.add("show-more-button");
      button.textContent = "더보기";
      button.addEventListener("click", throttle(callback, SHOW_MORE_THROTTLE_MS));
      document
        .querySelector(".thumbnail-list")
        ?.insertAdjacentElement("afterend", button);
    }
  } else {
    document.querySelector(".show-more-button")?.remove();
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