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

const MOVIE_DETAIL = Object.freeze({
  container: 'movie-detail',
  header: 'movie-detail-header',
  genre: 'genre',

  // TODO: VotingAverage 컴포넌트로 분리
  votingAverage: 'voting-average',
  votingAverageIcon: 'voting-average-icon',
  votingAverageScore: 'voting-average-score',

  overview: 'movie-detail-overview',
});

const STAR_RATING = Object.freeze({
  container: 'star-rating',
  label: 'star-rating-label',
  board: 'star-rating-board',
  icon: 'star-icon',
  score: 'rating-score',
  description: 'rating-description',
});

const SELECTORS = {
  INFINITE_SCROLL_TRIGGER,
  MOVIE_ITEM,
  MODAL,
  MOVIE_DETAIL_MODAL,
  MOVIE_DETAIL,
  STAR_RATING,
};

export default SELECTORS;
