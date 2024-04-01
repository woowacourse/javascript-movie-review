import './style.css';
import { MovieListType, MovieType } from '../../types/movie';
import DOM from '../../utils/DOM';
import skeletonManager from '../Skeleton/Skeleton';
import movieItemManager from '../MovieItem/MovieItem';

const { $ } = DOM;

const movieListManager = {
  renderMovieList(movieList: MovieListType, isLastPage: boolean) {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    movieList.forEach((movie: MovieType) => {
      ul.appendChild(movieItemManager.render(movie));
    });

    skeletonManager.remove();

    return $('.item-container')?.appendChild(ul);
  },
};

export default movieListManager;
