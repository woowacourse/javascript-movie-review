import { MOVIE_ITEM } from '../../../constants/INFORMATION';
import './MovieItemsSkeleton.css';

const MovieitemsSkeleton = {
  create(): DocumentFragment {
    const movieItems = document.createDocumentFragment();

    Array.from({ length: MOVIE_ITEM.count }).forEach(() => {
      movieItems.appendChild(this.createMovieItemSkeleton());
    });

    return movieItems;
  },

  createMovieItemSkeleton() {
    const movieItem = document.createElement('li');

    movieItem.appendChild(this.createMovieItemCardSkeleton());

    return movieItem;
  },

  createMovieItemCardSkeleton() {
    const movieItemCardSkeleton = document.createElement('div');

    movieItemCardSkeleton.classList.add('item-card');

    movieItemCardSkeleton.appendChild(this.createMovieItemThumbnailSkeleton());
    movieItemCardSkeleton.appendChild(this.createMovieItemTitleSkeleton());
    movieItemCardSkeleton.appendChild(this.createMovieItemScoreSkeleton());

    return movieItemCardSkeleton;
  },

  createMovieItemThumbnailSkeleton() {
    const movieItemThumbnail = document.createElement('div');

    movieItemThumbnail.classList.add('item-thumbnail', 'skeleton');

    return movieItemThumbnail;
  },

  createMovieItemTitleSkeleton() {
    const movieItemTitle = document.createElement('div');

    movieItemTitle.classList.add('item-title', 'skeleton');

    return movieItemTitle;
  },

  createMovieItemScoreSkeleton() {
    const movieItemScore = document.createElement('div');

    movieItemScore.classList.add('item-score', 'skeleton');

    return movieItemScore;
  },
};

export default MovieitemsSkeleton;
