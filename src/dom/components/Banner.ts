import { Movie } from "../../apis/movie/type";

const BANNER_ID = "background-container";

let bannerElement: HTMLElement | null = null;

const createBannerTemplate = (movie: Movie | null) => `
  <div class="background-container" id="${BANNER_ID}">
    <div aria-hidden="true" class="overlay"></div>
    <div class="top-rated-container">
      <div class="top-rated-movie">
        <div class="rate">
          <img class="star" src="./images/star_empty.png"/>
          <span class="rate-value">${movie?.vote_average ?? "..."}</span>
        </div>
        <h3 class="title">${movie?.title ?? "정보를 불러오는 중..."}</h3>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
`;

export const renderBanner = (
  parent: HTMLElement,
  movie: Movie | null = null,
) => {
  if (bannerElement) {
    bannerElement.remove();
  }

  parent.insertAdjacentHTML("beforeend", createBannerTemplate(movie));
  bannerElement = document.getElementById(BANNER_ID);

  if (bannerElement && movie) {
    bannerElement.style.backgroundImage = `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path})`;
  }
};

export const removeBanner = () => {
  bannerElement?.remove();
  bannerElement = null;
};

export const hideBanner = () => {
  bannerElement?.classList.add("hidden");
};

export const showBanner = () => {
  bannerElement?.classList.remove("hidden");
};
