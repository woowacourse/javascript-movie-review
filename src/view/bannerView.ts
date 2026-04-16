import { BANNER_IMAGE_URL } from "../constants/api";
import NO_IMAGE from "../../public/images/no-image.png";

class BannerView {
  #rateValue = document.querySelector(".rate-value");
  #title = document.querySelector(".title");
  #banner = document.querySelector<HTMLImageElement>(
    ".background-container",
  );
  #errorBannerContainer = document.querySelector<HTMLDivElement>(".error-banner-container");
  #bannerRetryButton = document.querySelector<HTMLButtonElement>(".banner-retry-button");
  #topRatedContainer = document.querySelector<HTMLDivElement>(".top-rated-container");

  renderBanner(bannerMovie: Movies) {
    this.#topRatedContainer?.classList.remove("hidden");
    this.#errorBannerContainer?.classList.add("hidden");

    if (this.#rateValue) this.#rateValue.textContent = bannerMovie.vote_average ? String(bannerMovie.vote_average) : "0";
    if (this.#title) this.#title.textContent = bannerMovie.title ?? "제목 없음";
    if (this.#banner) this.#banner.style.backgroundImage = bannerMovie.poster_path ? `url(${BANNER_IMAGE_URL + bannerMovie.poster_path})` : `url(${NO_IMAGE})`;
  };

  renderErrorBanner() {
    this.#topRatedContainer?.classList.add('hidden');
    this.#errorBannerContainer?.classList.remove("hidden");
  };

  hideBanner() {
    this.#banner?.classList.add('hidden');
    this.#errorBannerContainer?.classList.add("hidden");
  };

  bindBannerRetryClick(handler: () => void) {
    this.#bannerRetryButton?.addEventListener("click", () => {
      handler();
    });
  };
  
}

export const bannerView = new BannerView();
