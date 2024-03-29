import MovieData from '../../interfaces/MovieData';
import { starFilled } from '../../resources';
import { MOVIE_POSTER_URL } from '../../constants/MOVIES_URL';
import ReplaceSkeletonProps from '../../interfaces/ReplaceSkeletonProps';

const MovieItem = {
  replaceSkeleton({ itemCard, movieData, moiveItemDetailModal }: ReplaceSkeletonProps) {
    if (movieData === undefined) return itemCard.remove();

    this.replaceThumbnail(itemCard, movieData);
    this.replaceTitle(itemCard, movieData);
    this.replaceScore(itemCard, movieData);

    itemCard.addEventListener('click', () => {
      moiveItemDetailModal.setDetailMovieData(movieData);
      moiveItemDetailModal.open();
    });
  },

  replaceThumbnail(itemCard: HTMLElement, movieData: MovieData) {
    const oldThumbnail = itemCard.querySelector('.item-thumbnail');
    const newThumbnail = document.createElement('img');

    newThumbnail.classList.add('item-thumbnail');
    newThumbnail.src = `${MOVIE_POSTER_URL}${movieData.poster_path}`;
    newThumbnail.loading = 'lazy';
    newThumbnail.alt = movieData.title;

    oldThumbnail?.replaceWith(newThumbnail);
  },

  replaceTitle(itemCard: HTMLElement, movieData: MovieData) {
    const oldTitle = itemCard.querySelector('.item-title');
    const newTitle = document.createElement('p');

    newTitle.classList.add('item-title');
    newTitle.textContent = movieData.title;

    oldTitle?.replaceWith(newTitle);
  },

  replaceScore(itemCard: HTMLElement, movieData: MovieData) {
    const oldScore = itemCard.querySelector('.item-score');
    const newScore = document.createElement('p');

    newScore.classList.add('item-score');
    newScore.textContent = `${movieData.vote_average.toFixed(1)} `;

    newScore.appendChild(this.createStarImg());

    oldScore?.replaceWith(newScore);
  },

  createStarImg(): HTMLElement {
    const star = document.createElement('img');

    star.src = starFilled;
    star.alt = '별점';

    return star;
  },
};

export default MovieItem;
