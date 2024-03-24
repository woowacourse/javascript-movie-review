import MovieItem from '../MovieItem/MovieItem';
import { Movie } from './../../types/movie';
import '../MovieList/MovieList.css';
import { NotFound } from '../NotFound/NotFound';
import { getUrlParams } from '../../utils/queryString';

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
  }

  set newList(movieList: Movie[]) {
    this.movieList = movieList;
  }

  // rerender() {
  //   this.render();
  // }

  render() {
    if (!this.movieList.length) return NotFound();
    return this.renderMovieList();
  }

  renderSkeleton() {
    const skeletonBox = new DocumentFragment();

    Array.from({ length: 20 }).forEach((_, i) => {
      const moveItemTemplate = MovieItem.skeletonTemplate();
      moveItemTemplate.setAttribute('data-skeleton-id', String(i + 1));
      skeletonBox.append(moveItemTemplate);
    });

    const movieListBox = document.querySelector('.item-list');
    if (!movieListBox) return;
    movieListBox.append(skeletonBox);

    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }

  renderMovieList() {
    Array.from({ length: 20 }).forEach((_, i) => {
      const skeletonTemplate = document.querySelector(`li[data-skeleton-id="${i + 1}"]`);
      if (!skeletonTemplate) return;

      /*영화가 있을 때는 영화정보가 담긴 movieItem으로 바꾸기*/
      if (this.movieList[i]) {
        const moveItemTemplate = MovieItem.template(this.movieList[i]);
        return skeletonTemplate.replaceWith(moveItemTemplate);
      }
      skeletonTemplate.remove();
    });

    const movieListBox = document.querySelector('.item-list');
    if (!movieListBox) return;
    movieListBox.classList.add('grid');
    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }
}

export default MovieList;
