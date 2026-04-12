import { Movie } from "../../types/movie";
import { BASE_URL } from "../constants/constant";
import { createImageUrl } from "../movie-list/movieListMarkup";

export interface HeroSectionElements {
  section: HTMLElement;
  siteHeader: HTMLElement;
  backdrop: HTMLDivElement;
  title: HTMLHeadingElement;
  rate: HTMLDivElement;
  rateValue: HTMLSpanElement;
}

export class HeroSection {
  constructor(private readonly el: HeroSectionElements) {}

  update(movie: Movie): void {
    const posterImageUrl = createImageUrl(BASE_URL.HERO_BASE_URL, movie.hero_path ?? "");

    this.el.backdrop.style.backgroundImage = posterImageUrl ? `url("${posterImageUrl}")` : "";
    this.el.rate.hidden = false;
    this.el.rateValue.textContent = movie.rate.toFixed(1);
    this.el.title.textContent = movie.title;
  }

  show(): void {
    this.el.section.hidden = false;
    this.el.siteHeader.classList.add("site-header--overlay");
  }

  hide(): void {
    this.el.section.hidden = true;
    this.el.siteHeader.classList.remove("site-header--overlay");
  }
}