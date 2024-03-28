import { ELEMENT_SELECTOR } from '../../../constants/selector';
import { querySelector } from '../../../utils/dom/selector';
import MovieReviewBody from './MovieReviewBody';

export const renderMovieReviewBody = (movieName: string) => {
  const $section = querySelector<HTMLElement>(ELEMENT_SELECTOR.movieReviewSection);
  $section.remove();

  const $main = querySelector<HTMLElement>(ELEMENT_SELECTOR.main);
  new MovieReviewBody($main, { movieType: movieName });
};
