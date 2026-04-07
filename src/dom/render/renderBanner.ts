import { Movie } from "../../apis/movie/api";

interface RenderBannerProps {
  movie: Movie;
}

export const renderBanner = ({ movie }: RenderBannerProps) => {
  const banner = document.getElementById(
    "background-container",
  ) as HTMLDivElement;
  const bannerTitle = document.querySelector(
    "#background-container h3",
  ) as HTMLHeadingElement;
  const bannerRate = document.querySelector(
    "#background-container span",
  ) as HTMLSpanElement;

  if (banner && bannerTitle && bannerRate) {
    banner.style.backgroundImage = `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path})`;
    bannerTitle.textContent = movie.title;
    bannerRate.textContent = String(movie.vote_average);
  }
};
