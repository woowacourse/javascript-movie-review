import type { AppElements } from "../../types/dom";
import { $, $$ } from "../utils/util";

export const getAppElements = (): AppElements => ({
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
  heroDetailButton: $<HTMLButtonElement>(".hero-detail-button"),

  skeletonCard: $<HTMLUListElement>(".skeleton-card"),
  infiniteScrollSentinel: $<HTMLDivElement>("#infinite-scroll-sentinel"),

  modalBackground: $<HTMLDialogElement>("#modalBackground"),
  closeModal: $<HTMLButtonElement>("#closeModal"),
  modalCloseIcon: $<HTMLImageElement>("#modalCloseIcon"),
  modalPosterImage: $<HTMLImageElement>("#modalPosterImage"),
  modalTitle: $<HTMLHeadingElement>("#modalTitle"),
  modalCategory: $<HTMLParagraphElement>("#modalCategory"),
  modalRateIcon: $<HTMLImageElement>("#modalRateIcon"),
  modalRateValue: $<HTMLSpanElement>("#modalRateValue"),
  myRatingMessage: $<HTMLSpanElement>("#myRatingMessage"),
  myRatingScore: $<HTMLSpanElement>("#myRatingScore"),
  myRatingButtons: $$<HTMLButtonElement>(".my-rating-star-button"),
  modalDetail: $<HTMLParagraphElement>("#modalDetail"),
});
