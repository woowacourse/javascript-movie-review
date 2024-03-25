import ResponseData from '../../interfaces/ResponseData';
import MovieData from '../../interfaces/MovieData';
import { starFilled } from '../../resources';
import { MOVIE_POSTER_URL } from '../../constants/MOVIES_URL';

const MovieItems = {
  replaceSkeletons(movieItems: HTMLUListElement, respondData: ResponseData) {
    const itemCards = movieItems.querySelectorAll('li');
    itemCards.forEach((itemCard, index) => this.replaceSkeleton(itemCard, respondData.results[index]));

    if (respondData.results[0] === undefined) {
      this.showNoResult(movieItems);
    }
  },

  showNoResult(movieItems: HTMLUListElement): void {
    const noResultText = document.createElement('h2');

    noResultText.textContent = '존재하지 않습니다. 다시 입력해주세요.';

    movieItems.replaceWith(noResultText);
  },

  replaceSkeleton(itemCard: HTMLElement, movieData: MovieData) {
    if (movieData === undefined) {
      return itemCard.remove();
    }

    this.replaceThumbnail(itemCard, movieData);
    this.replaceTitle(itemCard, movieData);
    this.replaceScore(itemCard, movieData);
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
    newScore.appendChild(this.createStarElement());

    oldScore?.replaceWith(newScore);
  },

  createStarElement(): HTMLElement {
    const star = document.createElement('img');

    star.setAttribute('src', starFilled);
    star.alt = '별점';

    return star;
  },
};

export default MovieItems;
