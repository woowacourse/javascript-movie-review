import { $ } from "./selector";

export interface AppShellElements {
  movieList: HTMLUListElement;
  siteHeader: HTMLElement;
  searchForm: HTMLFormElement;
  searchInput: HTMLInputElement;
  noResult: HTMLDivElement;
  movieSectionTitle: HTMLHeadingElement;

  heroSection: HTMLElement;
  heroBackdrop: HTMLDivElement;
  heroRate: HTMLDivElement;
  heroRateValue: HTMLSpanElement;
  heroTitle: HTMLHeadingElement;

  skeletonCard: HTMLUListElement;
  seeMoreBtn: HTMLButtonElement;

  // 모달
  modalBackground: HTMLDivElement;
  closeModal: HTMLButtonElement;
  modalPoster: HTMLImageElement;
  modalTitle: HTMLHeadingElement;
  modalCategory: HTMLParagraphElement;
  modalRateValue: HTMLSpanElement;
  modalDetail: HTMLParagraphElement;
  myRatingStars: HTMLDivElement;
  myRatingLabel: HTMLParagraphElement;
}

export const queryAppShell = (): AppShellElements => ({
  movieList: $<HTMLUListElement>(".thumbnail-list"),
  siteHeader: $<HTMLElement>(".site-header"),
  searchForm: $<HTMLFormElement>("#search-form"),
  searchInput: $<HTMLInputElement>("#search-input"),
  noResult: $<HTMLDivElement>(".no-result"),
  movieSectionTitle: $<HTMLHeadingElement>(".movie-section-title"),

  heroSection: $<HTMLElement>("#hero-section"),
  heroBackdrop: $<HTMLDivElement>("#hero-backdrop"),
  heroRate: $<HTMLDivElement>("#hero-rate"),
  heroRateValue: $<HTMLSpanElement>("#hero-rate-value"),
  heroTitle: $<HTMLHeadingElement>("#hero-title"),

  skeletonCard: $<HTMLUListElement>(".skeleton-card"),
  seeMoreBtn: $<HTMLButtonElement>("#see-more-btn"),

  // 모달
  modalBackground: $<HTMLDivElement>("#modalBackground"),
  closeModal: $<HTMLButtonElement>("#closeModal"),
  modalPoster: $<HTMLImageElement>("#modal-poster"),
  modalTitle: $<HTMLHeadingElement>("#modal-title"),
  modalCategory: $<HTMLParagraphElement>("#modal-category"),
  modalRateValue: $<HTMLSpanElement>("#modal-rate-value"),
  modalDetail: $<HTMLParagraphElement>("#modal-detail"),
  myRatingStars: $<HTMLDivElement>("#my-rating-stars"),
  myRatingLabel: $<HTMLParagraphElement>("#my-rating-label"),
});
