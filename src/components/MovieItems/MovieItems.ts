import './style.css';
import '../Skeleton/style.css';
import { MovieListType, MovieType } from '../../types/movie';
import createMovieItem from '../MovieItem/MovieItem';
import DOM from '../../utils/DOM';
import Skeleton from '../Skeleton/Skeleton';

const { $ } = DOM;

const movieItems = {
  createMovieItems(movieList: MovieListType, isLastPage: boolean) {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    movieList.forEach((movie: MovieType) => {
      ul.appendChild(createMovieItem(movie));
    });

    Skeleton.remove();
    this.removeButtonIfLastPage(isLastPage);

    return $('.item-container')?.appendChild(ul);
  },

  removeButtonIfLastPage(isLastPage: boolean) {
    if (isLastPage) $('.btn')?.remove();
  },
};

export default movieItems;
