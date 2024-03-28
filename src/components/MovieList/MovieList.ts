import MovieItem from '../MovieItem/MovieItem';
import { Movie } from './../../types/movie';
import '../MovieList/MovieList.css';
import { MOVIE_COUNT_PER_PAGE } from '../../consts/UISettings';
import { NotFound } from '../Error/NotFound/NotFound';
import { movieItemskeletonTemplate } from '../MovieItem/Skeleton';
import MovieInfoModal from '../MovieInfoModal/MovieInfoModal';

interface Props {
  movieList: Movie[];
}

class MovieList {
  movieList: Movie[];
  movieInfoModal: MovieInfoModal;

  constructor({ movieList }: Props) {
    this.movieList = movieList;
    this.movieInfoModal = new MovieInfoModal();
  }

  set newList(movieList: Movie[]) {
    this.movieList = movieList;
  }

  render() {
    if (!this.movieList.length) return NotFound();

    return this.renderMovieList();
  }

  renderSkeleton() {
    const skeletonBox = new DocumentFragment();

    Array.from({ length: MOVIE_COUNT_PER_PAGE }).forEach((_, i) => {
      const moveItemTemplate = movieItemskeletonTemplate();
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
    Array.from({ length: MOVIE_COUNT_PER_PAGE }).forEach((_, i) => {
      const skeletonTemplate = document.querySelector(`li[data-skeleton-id="${i + 1}"]`);
      if (!skeletonTemplate) return;

      if (this.movieList[i]) {
        const moveItemTemplate = new MovieItem({
          movie: this.movieList[i],
          rerenderModal: () => this.movieInfoModal.rerender(),
        }).template();
        return skeletonTemplate.replaceWith(moveItemTemplate);
      }
      skeletonTemplate.remove();
    });

    const movieListBox = document.querySelector('.item-list');
    //TODO: querySelector 로 바꾸기
    if (!movieListBox) return;
    movieListBox.classList.add('grid');
    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }
}

export default MovieList;
