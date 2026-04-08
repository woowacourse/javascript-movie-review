import { createDetailButton } from "./detail-button";
import { MovieList } from "../domains/movie";
import starIconSrc from "../../templates/images/star_empty.png";

interface HeroOptions {
  movieList: MovieList;
  onDetailClick: () => void;
}

export function createHero({
  movieList,
  onDetailClick,
}: HeroOptions): HTMLElement {
  const bgImage = createBgImage();
  const topRatedContainer = createTopRatedContainer(onDetailClick);
  const backgroundContainer = createBackgroundContainer(
    bgImage,
    topRatedContainer,
  );

  bindMovieList(movieList, bgImage, topRatedContainer);

  return backgroundContainer;
}

function createBackgroundContainer(
  bgImage: HTMLImageElement,
  topRatedContainer: HTMLElement,
): HTMLElement {
  const container = document.createElement("div");
  container.className = "background-container";

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("aria-hidden", "true");

  container.append(bgImage, overlay, topRatedContainer);
  return container;
}

function bindMovieList(
  movieList: MovieList,
  bgImage: HTMLImageElement,
  topRatedContainer: HTMLElement,
): void {
  movieList.subscribe(({ movies, isPending, page }) => {
    if (isPending || movies.length === 0 || page !== 1) return;
    updateHero(bgImage, topRatedContainer, movies[0]);
  });
}

function updateHero(
  bgImage: HTMLImageElement,
  topRatedContainer: HTMLElement,
  movie: { posterSrc: string; title: string; rating: number },
): void {
  bgImage.src = movie.posterSrc;
  bgImage.alt = `${movie.title}의 포스터`;
  topRatedContainer.querySelector<HTMLElement>(".title")!.textContent =
    movie.title;
  topRatedContainer.querySelector<HTMLElement>(".rate-value")!.textContent =
    String(movie.rating);
}

function createBgImage(): HTMLImageElement {
  const img = document.createElement("img");
  img.className = "background-image";
  img.alt = "";
  return img;
}

function createTopRatedContainer(onDetailClick: () => void): HTMLElement {
  const container = document.createElement("div");
  container.className = "top-rated-container";

  const topRatedMovie = document.createElement("div");
  topRatedMovie.className = "top-rated-movie";

  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateValue = document.createElement("span");
  rateValue.className = "rate-value";

  rateDiv.append(starImg, rateValue);

  const titleDiv = document.createElement("div");
  titleDiv.className = "title";

  const detailButton = createDetailButton(onDetailClick);

  topRatedMovie.append(rateDiv, titleDiv, detailButton);
  container.appendChild(topRatedMovie);
  return container;
}
