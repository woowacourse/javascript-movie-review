import OPTIONS from '../../constants/OPTIONS';
import MovieItems from '../MovieItems/MovieItems';

const Skeleton = {
  createMovieSkeleton(movieItemsList: HTMLUListElement): HTMLUListElement {
    [...Array(OPTIONS.movieItemCount)].forEach(() => {
      movieItemsList.appendChild(this.createMovieItemSkeleton());
    });
    return movieItemsList;
  },

  createMovieItemSkeleton() {
    const movieItem = document.createElement('li');
    const movieItemLink = MovieItems.createMovieItemLink(this.createMovieItemCardSkeleton());

    movieItem.appendChild(movieItemLink);

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
    const movieItemThumbnail = document.createElement('img');
    movieItemThumbnail.classList.add('item-thumbnail', 'skeleton');

    return movieItemThumbnail;
  },

  createMovieItemTitleSkeleton() {
    const movieItemTitle = document.createElement('p');
    movieItemTitle.classList.add('item-title', 'skeleton');

    return movieItemTitle;
  },

  createMovieItemScoreSkeleton() {
    const movieItemScore = document.createElement('p');
    movieItemScore.classList.add('item-score', 'skeleton');

    return movieItemScore;
  },
};

export default Skeleton;
