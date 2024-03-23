import OPTIONS from '../../constants/OPTIONS';
import ResponseData from '../../interfaces/ResponseData';
import MovieData from '../../interfaces/MovieData';
import { starFilled } from '../../resources';
import { MOVIE_POSTER_URL } from '../../constants/DTO';

const MovieItems = {
  createSkeleton(): HTMLUListElement {
    const movieItems = document.createElement('ul');
    movieItems.classList.add('item-list');

    [...Array(OPTIONS.movieItemCount)].forEach(() => {
      movieItems.appendChild(this.createMovieItemSkeleton());
    });

    return movieItems;
  },

  replaceSkeletons(movieItems: HTMLUListElement, respondData: ResponseData) {
    const itemCards = movieItems.querySelectorAll('li');
    itemCards.forEach((item, index) => this.replaceSkeleton(item, respondData.results[index]));
  },

  replaceSkeleton(itemCard: HTMLElement, movieData: MovieData) {
    if (movieData === undefined) {
      return itemCard.remove();
      // 검색 결과가 없습니다 생성
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

export default MovieItems;
