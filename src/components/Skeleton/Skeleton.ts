import OPTIONS from '../../constants/OPTIONS';
import { getDomElement } from '../../util/DOM';

const Skeleton = {
  createMovieSkeleton(movieItemsList: HTMLUListElement): HTMLUListElement {
    [...Array(OPTIONS.movieItemCount)].forEach(() => {
      movieItemsList.appendChild(this.createMovieItemSkeleton());
    });
    return movieItemsList;
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
    movieItemCardSkeleton.appendChild(this.createMovieItemVoteAverageSkeleton());

    return movieItemCardSkeleton;
  },

  createMovieItemThumbnailSkeleton() {
    const movieItemThumbnail = document.createElement('img');
    movieItemThumbnail.classList.add('item-thumbnail', 'skeleton');

    return movieItemThumbnail;
  },

  createMovieItemTitleSkeleton() {
    const movieItemTitle = document.createElement('p');
    movieItemTitle.classList.add('item-title', 'skeleton');

    return movieItemTitle;
  },

  createMovieItemVoteAverageSkeleton() {
    const movieItemVoteAverage = document.createElement('p');
    movieItemVoteAverage.classList.add('item-vote-average', 'skeleton');

    return movieItemVoteAverage;
  },
};

export default Skeleton;
