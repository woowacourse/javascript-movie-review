import './MovieList.css';
import SkeletonMovieItem from '../MovieItem/SkeletonMovieItem';

const PAGE_SIZE = 20;

const SkeletonMovieList = ({ title }: { title: string }) => {
  const $section = document.createElement('section');
  const $title = document.createElement('h2');
  const $ul = document.createElement('ul');

  const render = () => {
    $section.classList.add('item-view');

    $title.textContent = title;

    $ul.classList.add('item-list');
    const fragment = document.createDocumentFragment();
    Array.from({ length: PAGE_SIZE }).forEach(() => {
      fragment.appendChild(SkeletonMovieItem().render());
    });
    $ul.appendChild(fragment);

    $section.appendChild($title);
    $section.appendChild($ul);

    return $section;
  };

  return {
    render,
  };
};

export default SkeletonMovieList;
