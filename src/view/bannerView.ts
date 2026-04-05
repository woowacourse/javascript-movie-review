import { BANNER_IMAGE_URL } from "../constants/api";

class BannerView {
  #rateValue = document.querySelector(".rate-value");
  #title = document.querySelector(".title");
  #banner = document.querySelector<HTMLImageElement>(
    ".background-container",
  );
  #bannerContainer = document.querySelector<HTMLElement>(".background-container");

  renderBanner(bannerMovie: Movies) {
    if (!this.#rateValue || !this.#title || !this.#banner) return;
    this.#rateValue.textContent = String(bannerMovie.vote_average);
    this.#title.textContent = bannerMovie.title;
    this.#banner.style.backgroundImage = `url(${BANNER_IMAGE_URL + bannerMovie.poster_path})`;
  };

  hideBanner() {
    if (this.#bannerContainer) this.#bannerContainer.style.display = "none";
  };
}

export const bannerView = new BannerView();
