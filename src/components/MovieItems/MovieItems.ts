import './style.css';
import { MovieListType, MovieType } from '../../types/movie';
import createMovieItem from '../MovieItem/MovieItem';

const createMovieItems = (movieList: MovieListType, isLastPage: boolean) => {
  const ul = document.createElement('ul');
  ul.classList.add('item-list');
  if (movieList?.length === 0) {
    const templates = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
    `;
    ul.classList.add('item-list--skeleton');
    ul.innerHTML = templates.repeat(20);
  } else {
    document.querySelector('.item-list--skeleton')?.remove();
    movieList.forEach((movie: MovieType) => {
      ul.appendChild(createMovieItem(movie));
    });
  }

  const showMoreButton = document.querySelector('.btn');
  showMoreButton?.insertAdjacentElement('beforebegin', ul);

  if (isLastPage) showMoreButton?.remove();

  return ul;
};

export default createMovieItems;
