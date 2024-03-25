import IRespondData from '../../interfaces/IRespondData';
import IMovieData from '../../interfaces/IMovieData';
import { starFilled } from '../../resources';
import { getDomElement, getAllDomElements } from '../../util/DOM';
import { MOVIE_POSTER_URL } from '../../constants/DTO';
import Skeleton from '../Skeleton/Skeleton';

const MovieItems = {
  createSkeleton() {
    const movieItemsList = document.createElement('ul');
    movieItemsList.classList.add('item-list');
    Skeleton.createMovieSkeleton(movieItemsList);
    return movieItemsList;
  },

  async replaceAllSkeletons(movieItems: HTMLUListElement, respondData: IRespondData) {
    const itemCards = getAllDomElements('li', movieItems);
    itemCards.forEach((item, index) => this.replaceSkeleton(item, respondData.results[index]));
  },

  replaceSkeleton(itemCard: HTMLElement, movieData: IMovieData) {
    if (movieData === undefined) {
      return itemCard.remove();
    }
    this.replaceThumbnail(itemCard, movieData);
    this.replaceTitle(itemCard, movieData);
    this.replaceScore(itemCard, movieData);
  },

  replaceThumbnail(itemCard: HTMLElement, movieData: IMovieData) {
    const oldThumbnail = getDomElement('.item-thumbnail', itemCard);
    const newThumbnail = document.createElement('img');

    newThumbnail.classList.add('item-thumbnail');
    newThumbnail.src = `${MOVIE_POSTER_URL}${movieData.poster_path}`;
    newThumbnail.loading = 'lazy';
    newThumbnail.alt = movieData.title;

    oldThumbnail.replaceWith(newThumbnail);
  },

  replaceTitle(itemCard: HTMLElement, movieData: IMovieData) {
    const oldTitle = getDomElement('.item-title', itemCard);
    const newTitle = document.createElement('p');

    newTitle.classList.add('item-title');
    newTitle.textContent = movieData.title;

    oldTitle.replaceWith(newTitle);
  },

  replaceScore(itemCard: HTMLElement, movieData: IMovieData) {
    const oldScore = getDomElement('.item-score', itemCard);
    const newScore = document.createElement('p');

    newScore.classList.add('item-score');
    newScore.textContent = `${movieData.vote_average.toFixed(1)} `;
    newScore.appendChild(this.createStarElement());

    oldScore.replaceWith(newScore);
  },

  createStarElement(): HTMLElement {
    const star = document.createElement('img');
    star.setAttribute('src', starFilled);
    star.alt = '별점';
    return star;
  },

  createMovieItemLink(movieItemCard: HTMLElement) {
    const movieItemLink = document.createElement('a');

    movieItemLink.setAttribute('href', '#');

    movieItemLink.appendChild(movieItemCard);

    return movieItemLink;
  },

  replaceMovieCardSkeleton(itemCard: HTMLElement, movieData: IMovieData) {
    if (movieData === undefined) {
      return itemCard.remove();
    }
    this.replaceThumbnail(itemCard, movieData);
    this.replaceTitle(itemCard, movieData);
    this.replaceScore(itemCard, movieData);
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
