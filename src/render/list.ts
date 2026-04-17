import { Movie } from "../type";
import { handleMovieClick } from "./modal";

function createSkeletonBlock(className: string): HTMLSpanElement {
  const block = document.createElement("span");
  block.className = `skeleton ${className}`;
  block.setAttribute("aria-hidden", "true");

  return block;
}

function getResponsiveSkeletonCount(): number {
  const list = document.querySelector<HTMLElement>(".thumbnail-list");
  const gridTemplateColumns = list
    ? window.getComputedStyle(list).gridTemplateColumns
    : "";
  const gridColumns = gridTemplateColumns && gridTemplateColumns !== "none"
    ? gridTemplateColumns.split(" ").filter(Boolean).length
    : 0;

  if (gridColumns > 0) {
    return gridColumns * 4;
  }

  if (window.matchMedia("(max-width: 767px)").matches) return 8;
  if (window.matchMedia("(max-width: 1023px)").matches) return 12;
  return 20;
}

function getThumbnailList(): HTMLElement | null {
  return document.querySelector(".thumbnail-list");
}

export function createMovieItemTemplate(movie: Movie): HTMLElement {
  const li = document.createElement("li");
  li.className = "movie-list-item";

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

  rateP.append(starImg, rateSpan);

  const titleP = document.createElement("p");
  titleP.className = "movie-title";
  titleP.textContent = movie.title;

  itemDesc.append(rateP, titleP);
  item.append(img, itemDesc);
  li.appendChild(item);

  return li;
}

export function createSkeletonItemTemplate(): HTMLElement {
  const li = document.createElement("li");
  li.className = "movie-list-item skeleton-item";

  const item = document.createElement("div");
  item.className = "item";

  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail skeleton";

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rate = document.createElement("p");
  rate.className = "rate";
  rate.append(
    createSkeletonBlock("skeleton-star"),
    createSkeletonBlock("skeleton-rate"),
  );

  const title = document.createElement("p");
  title.className = "movie-title skeleton-title-group";
  title.append(
    createSkeletonBlock("skeleton-title"),
    createSkeletonBlock("skeleton-title skeleton-title-secondary"),
  );

  itemDesc.append(rate, title);
  item.append(thumbnail, itemDesc);
  li.appendChild(item);

  return li;
}

export function renderSkeletonItems(length: number = getResponsiveSkeletonCount()) {
  const list = getThumbnailList();
  if (!list) return;

  Array.from({ length }).forEach(() => list.appendChild(createSkeletonItemTemplate()));
}

export function renderTopRatedMovie(movie: Movie) {
  const rateEl = document.querySelector(".top-rated-movie .rate-value");
  const titleEl = document.querySelector(".top-rated-movie .title");
  const detailButtonEl = document.querySelector<HTMLButtonElement>(".top-rated-movie .detail");
  const backgroundContainerEl = document.querySelector<HTMLDivElement>(".background-container");

  if (titleEl) titleEl.textContent = movie.title;
  if (rateEl) rateEl.textContent = movie.vote_average.toFixed(1);

  if (detailButtonEl) {
    detailButtonEl.disabled = false;
    detailButtonEl.onclick = () => handleMovieClick(movie.id);
  }

  if (backgroundContainerEl) {
    backgroundContainerEl.style.backgroundImage = `url(${import.meta.env.VITE_IMAGE_BASE_URL}/w1920_and_h800_multi_faces${movie.backdrop_path})`;
  }
}

export function renderMovies(movieList: Movie[]) {
  const list = getThumbnailList();
  if (!list) return;

  movieList.forEach((movie) => list.appendChild(createMovieItemTemplate(movie)));
}

export function updateEmptyListAlert() {
  const listEl = getThumbnailList();
  if (!listEl) return;

  if (listEl.children.length === 0) {
    listEl.insertAdjacentHTML(
      "afterend",
      `
        <div class="empty-list-alert">
          <img src="${import.meta.env.BASE_URL}svg/planet.svg" alt="행성이" />
          <p class="empty-list-message">검색 결과가 없습니다.</p>
        </div>
      `,
    );

    return;
  }

  document.querySelector(".empty-list-alert")?.remove();
}

export function renderListTitle(query: string) {
  const listTitleEl = document.querySelector(".list-title");
  if (listTitleEl) {
    listTitleEl.textContent = `"${query}" 검색 결과`;
  }
}

export function removeSkeletonItem() {
  document.querySelectorAll(".skeleton-item").forEach((element) => element.remove());
}

export function removeTopRatedMovieSkeleton() {
  document.querySelectorAll(".top-rated-movie .skeleton").forEach((element) => element.remove());
}
