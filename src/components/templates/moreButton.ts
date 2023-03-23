import { movie } from '../../state/state';

export const generateMoreButtonTemplate = () => {
  return movie.currentPage === movie.totalPages
    ? ''
    : '<button class="btn primary full-width" id="more-button" aria-label="더 보기">더 보기</button>';
};
