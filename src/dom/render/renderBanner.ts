import { Movie } from "../../apis/movie/api";

interface RenderBannerProps {
  movie: Movie | undefined;
}

export const renderBanner = ({ movie }: RenderBannerProps) => {
  if (!movie) return;

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
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
    bannerTitle.textContent = movie.title;
    bannerRate.textContent = String(movie.vote_average);
  }
};
