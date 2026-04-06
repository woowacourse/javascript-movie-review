const DOM = {
  get thumbnailList() {
    return document.querySelector<HTMLElement>(".thumbnail-list");
  },
  get backgroundContainer() {
    return document.querySelector<HTMLElement>(".background-container");
  },
  get loadMovieButton() {
    return document.querySelector<HTMLElement>("#load-movie-button");
  },
  get sectionTitle() {
    return document.querySelector<HTMLElement>("#section-title");
  },
  get banner() {
    return document.querySelector<HTMLElement>(".top-rated-movie");
  },
  get searchInput() {
    return document.querySelector<HTMLInputElement>(".search-input");
  },
};

export default DOM;
