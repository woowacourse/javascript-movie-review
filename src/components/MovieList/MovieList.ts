import MovieItem from '../MovieItem/MovieItem';
import { Movie } from './../../types/movie';
import { NotFound } from '../NotFound/NotFound';
import { PAGE_SIZE } from '../../consts/common';
import '../MovieList/MovieList.css';

interface Props {
  movieList: Movie[];
  isLoading: boolean;
}

class MovieList {
  movieList: Movie[];
  isLoading: boolean;

  constructor({ movieList, isLoading }: Props) {
    this.movieList = movieList;
    this.isLoading = isLoading;
    this.render();
  }

  set newList(movieList: Movie[]) {
    this.movieList = movieList;
  }

  rerender() {
    const skeletonBox = document.querySelector('#skeleton-box');
    if (skeletonBox) skeletonBox.remove();
    this.render();
  }

  render() {
    if (this.movieList.length === 0) return NotFound();
    return this.renderMovieList();
  }

  renderSkeleton() {
    const skeletonBox = document.createElement('div');
    skeletonBox.classList.add('item-list');
    skeletonBox.setAttribute('id', 'skeleton-box');

    Array.from({ length: PAGE_SIZE }).forEach(() => {
      const movieItemTemplate = MovieItem.skeletonTemplate();
      skeletonBox.append(movieItemTemplate);
    });

    const movieListBox = document.querySelector('.item-list');
    if (!movieListBox) return;
    movieListBox.append(skeletonBox);

    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }

  renderMovieList() {
    const fragment = new DocumentFragment();
    this.movieList.forEach(movie => {
      const movieItemTemplate = MovieItem.template(movie);
      fragment.append(movieItemTemplate);
    });

    const movieListBox = document.querySelector('.item-list');
    if (!movieListBox) return;
    movieListBox.append(fragment);

    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }
}

export default MovieList;
