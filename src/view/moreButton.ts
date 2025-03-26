import Button from '../component/Button';
import { addMovies } from '../domain/addMovies';
import { $ } from '../util/selector';
import { renderSkeletons } from './render/renderSkeletons';

const handleMoreButtonClick = async (page: number, total_pages: number, keyword?: string) => {
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const skeletonList = renderSkeletons({ height: 300 });
  container.appendChild(skeletonList);

  skeletonList.remove();

  const movies = await addMovies(page, keyword);
  container.appendChild(movies);

  if (page >= total_pages) {
    document.getElementById('moreButton')?.remove();
  }
};

export const moreButton = (page: number, total_pages: number, keyword?: string) => {
  const button = Button({
    text: '더보기',
    id: 'moreButton',
    onClick: () => handleMoreButtonClick(++page, total_pages, keyword)
  });

  return button;
};
