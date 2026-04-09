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
});
