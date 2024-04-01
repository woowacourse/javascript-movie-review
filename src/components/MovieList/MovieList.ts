import MovieItem from '../MovieItem/MovieItem';
import type { Movie } from '../../domain/entity/movie.type';
import '../MovieList/MovieList.css';
import { MOVIE_COUNT_PER_PAGE } from '../../consts/UISettings';
import { NotFound } from '../Error/NotFound/NotFound';
import MovieItemSkeleton from '../MovieItem/Skeleton';
import MovieInfoModal from '../MovieInfoModal/MovieInfoModal';
import Network from '../../assets/network_error.png';
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
    this.renderMovieList();
  }

  renderSkeleton() {
    const skeletonBox = new DocumentFragment();

    Array.from({ length: MOVIE_COUNT_PER_PAGE }).forEach((_, i) => {
      const moveItemTemplate = new MovieItemSkeleton(i + 1).renderSkeleton();
      skeletonBox.append(moveItemTemplate);
    });

    const movieListBox = document.querySelector('.item-list');
    if (!movieListBox) return;
    movieListBox.append(skeletonBox);
  }

  renderMovieList() {
    Array.from({ length: MOVIE_COUNT_PER_PAGE }).forEach((_, i) => {
      const skeletonTemplate = document.querySelector(`li[data-skeleton-id="${i + 1}"]`) as HTMLElement;
      if (!skeletonTemplate) return;

      if (this.movieList[i]) {
        skeletonTemplate.removeAttribute('data-skeleton-id');
        skeletonTemplate.setAttribute('data-movie-id', String(this.movieList[i].id));
        new MovieItem({
          skeletonTemplate: skeletonTemplate as HTMLElement,
          movie: this.movieList[i],
          rerenderModal: () => this.movieInfoModal.rerender(),
        }).render();
      }
    });
    this.removeRemainingSkeletons();
  }

  removeRemainingSkeletons() {
    const skeletonRemained = document.querySelectorAll(`[data-skeleton-id]`);
    skeletonRemained.forEach(skeleton => {
      skeleton.remove();
    });
  }
}

export default MovieList;
