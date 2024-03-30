const INFINITE_SCROLL_TRIGGER = Object.freeze({
  trigger: 'infinite-scroll-trigger',
});

const MOVIE_ITEM = Object.freeze({
  title: 'item-title',
  score: 'item-score',
  thumbnail: 'item-thumbnail',
  card: 'item-card',
});

const MODAL = Object.freeze({
  modal: 'modal',
  open: 'modal--open',
  backdrop: 'modal-backdrop',
  container: 'modal-container',
  header: 'modal-header',
  body: 'modal-body',
  closeBtn: 'modal-close-btn',
});

const MOVIE_DETAIL_MODAL = Object.freeze({
  container: 'movie-detail-modal',
  title: 'movie-title',
  poster: 'movie-poster',
});

const SELECTORS = {
  // movieListSection: 'item-view',
  // movieList: 'item-list',

  INFINITE_SCROLL_TRIGGER,
  MOVIE_ITEM,
  MODAL,
  MOVIE_DETAIL_MODAL,
};

export default SELECTORS;
