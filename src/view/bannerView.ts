import { BANNER_IMAGE_URL } from "../constants/api";

class BannerView {
  #rateValue = document.querySelector(".rate-value");
  #title = document.querySelector(".title");
  #banner = document.querySelector<HTMLImageElement>(
    ".background-container",
  );

  renderBanner(bannerMovie: Movies) {
    if (!this.#rateValue || !this.#title || !this.#banner) return;
    this.#rateValue.textContent = String(bannerMovie.vote_average);
    this.#title.textContent = bannerMovie.title;
    this.#banner.style.backgroundImage = `url(${BANNER_IMAGE_URL + bannerMovie.poster_path})`;
  };

  hideBanner() {
    if (this.#banner) this.#banner.classList.add('hidden');
  };
}

export const bannerView = new BannerView();
