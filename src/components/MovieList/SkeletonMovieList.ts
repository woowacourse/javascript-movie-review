import './MovieList.css';
import SkeletonMovieItem from '../MovieItem/SkeletonMovieItem';

export const PAGE_SIZE = 20;

const createUl = () => {
  const $ul = document.createElement('ul');
  $ul.classList.add('item-list');
  $ul.classList.add('skeleton');
  return $ul;
};

const SkeletonMovieList = () => {
  const $ul = createUl();

  const render = () => {
    const fragment = document.createDocumentFragment();
    Array.from({ length: PAGE_SIZE }).forEach(() => {
      fragment.appendChild(SkeletonMovieItem().render());
    });
    $ul.appendChild(fragment);

    return $ul;
  };

  return {
    render,
  };
};

export default SkeletonMovieList;
