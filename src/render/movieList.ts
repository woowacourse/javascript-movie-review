import { createMovieThumbnail } from "./thumbnail";
import { Movie } from "../../types/movie";
import { mapToThumbnailInfo } from "../utils/mapToThumbnailInfo";

type RenderMoviesListOptions = {
  append?: boolean;
};

export const renderMoviesList = (
  movies: Movie[],
  options: RenderMoviesListOptions = {},
  onLoadNextPage?: () => void,
) => {
  const { append = true } = options;
  const thumbnailList = document.querySelector(".thumbnail-list");
  const sentinel = document.createElement("div");

  if (!thumbnailList) {
    throw new Error("thumbnail-list 요소를 찾을 수 없습니다.");
  }
  if (!append) {
    thumbnailList.replaceChildren();
  }

  const thumbnailInfos = mapToThumbnailInfo(movies);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && onLoadNextPage) {
        observer.unobserve(entry.target);
        onLoadNextPage();
      }
    });
  });

  thumbnailInfos.forEach((movie) => {
    const movieThumbnail = createMovieThumbnail(movie);
    thumbnailList.appendChild(movieThumbnail);
  });
  thumbnailList.append(sentinel);
  observer.observe(sentinel);
};
