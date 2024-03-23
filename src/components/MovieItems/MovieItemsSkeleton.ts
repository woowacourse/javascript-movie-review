import OPTIONS from '../../constants/OPTIONS';

const MovieitemsSkeleton = {
  create(): HTMLUListElement {
    const movieItems = document.createElement('ul');

    movieItems.classList.add('item-list');

    Array.from({ length: OPTIONS.movieItemCount }).forEach(() => {
      movieItems.appendChild(this.createMovieItemSkeleton());
    });

    return movieItems;
  },

  createMovieItemSkeleton() {
    const movieItem = document.createElement('li');

    const movieItemLink = this.createMovieItemLink(this.createMovieItemCardSkeleton());

    movieItem.appendChild(movieItemLink);

    return movieItem;
  },

  createMovieItemLink(movieItemCard: HTMLElement) {
    const movieItemLink = document.createElement('a');

    movieItemLink.setAttribute('href', '#');

    movieItemLink.appendChild(movieItemCard);

    return movieItemLink;
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
