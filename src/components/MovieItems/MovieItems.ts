import IRespondData from '../../interfaces/FetchMovieListDTO';
import IMovieData from '../../interfaces/IMovieData';
import { starFilled } from '../../resources';
import { getDomElement, getAllDomElements } from '../../util/DOM';
import { MOVIE_POSTER_URL } from '../../constants/URLs';
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
    const thumbnail = getDomElement<HTMLImageElement>('.item-thumbnail', itemCard);

    thumbnail.classList.add('item-thumbnail');
    thumbnail.src = `${MOVIE_POSTER_URL}${movieData.poster_path}`;
    thumbnail.loading = 'lazy';
    thumbnail.alt = movieData.title;
    thumbnail.onload = () => thumbnail.classList.toggle('skeleton');
  },

  replaceTitle(itemCard: HTMLElement, movieData: IMovieData) {
    const title = getDomElement('.item-title', itemCard);

    title.classList.add('item-title');
    title.textContent = movieData.title;

    title.classList.toggle('skeleton');
  },

  replaceScore(itemCard: HTMLElement, movieData: IMovieData) {
    const score = getDomElement('.item-score', itemCard);

    score.classList.add('item-score');
    score.textContent = `${movieData.vote_average.toFixed(1)} `;
    score.appendChild(this.createStarElement());

    score.classList.toggle('skeleton');
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
