import Button from './Button';
import { addSkeletonList, removeSkeletonList } from './SkeletonList';
import { addMoreMovieList } from './MovieList';
import { $ } from '../util/selector';
import { Response } from '../api/type';

interface MoreButtonProps<T> {
  totalPages: number;
  fetchMovies: (args: T) => Promise<Response | null>;
  fetchArgs: Omit<T, 'page'>;
}

const INITIAL_PAGE = 1;

function MoreButton<T>({ totalPages, fetchMovies, fetchArgs }: MoreButtonProps<T>) {
  let page = INITIAL_PAGE;

  const handleButtonClick = async () => {
    if (page >= totalPages) {
      button.remove();
      return;
    }

    const container = $('.thumbnail-list') as HTMLElement;
    if (!container) return;

    addSkeletonList(container);

    const response = await fetchMovies({ ...fetchArgs, page: ++page } as T);

    if (!response) return;

    removeSkeletonList();
    addMoreMovieList(response.results);
  };

  const button = Button({
    text: '더보기',
    id: 'moreButton',
    onClick: handleButtonClick
  });

  return button;
}

export default MoreButton;
