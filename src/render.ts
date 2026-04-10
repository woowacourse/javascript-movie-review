import { Movie, MovieListResponse } from "./type";
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

  const rate = document.createElement("div");
  rate.className = "skeleton skeleton-rate";

  const title = document.createElement("div");
  title.className = "skeleton skeleton-title";

  itemDesc.appendChild(rate);
  itemDesc.appendChild(title);
  item.appendChild(thumbnail);
  item.appendChild(itemDesc);
  li.appendChild(item);

  return li;
}

export function renderSkeletonItems(length: number) {
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

export function renderShowMoreButton(prevResponseList: MovieListResponse[], page: number, callback: () => void) {
  if (
    prevResponseList.length &&
    prevResponseList[prevResponseList.length - 1].total_pages > page
  ) {
    if (!document.querySelector(".show-more-button")) {
      const button = document.createElement("button");
      button.classList.add("show-more-button");
      button.textContent = "더보기";
      button.addEventListener("click", throttle(callback));
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
    renderSkeletonItems(20);

    const responseList = await fetchFn(prevResponseList.length, page);
    prevResponseList.push(...responseList);

    const movieList = responseList.reduce((arr: Movie[], response) => {
      return [...arr, ...response.results];
    }, []);

    renderMovies(movieList);
    afterRender?.();

    renderShowMoreButton(prevResponseList, page, showMoreCallback);
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast({ title: error.name, message: error.message });
    }
  } finally {
    removeSkeletonItem();
    extraFinally?.();
  }
}
