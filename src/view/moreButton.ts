import Button from '../component/Button';
import { addMovies } from '../domain/addMovies';
import { $ } from '../util/selector';
import { hideSkeletons, renderSkeletons } from './render/renderSkeletons';

const handleMoreButtonClick = async (page: number, totalPages: number, keyword?: string) => {
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const skeletonList = renderSkeletons();
  container.appendChild(skeletonList);

  const movies = await addMovies(page, keyword);
  container.appendChild(movies);

  hideSkeletons();

  if (page === totalPages) {
    $('#moreButton')?.remove();
  }
};

export const moreButton = (page: number, totalPages: number, keyword?: string) => {
  return Button({
    text: '더보기',
    id: 'moreButton',
    onClick: () => handleMoreButtonClick(++page, totalPages, keyword)
  });
};
