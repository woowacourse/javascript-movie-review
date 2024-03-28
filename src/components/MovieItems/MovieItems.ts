import IRespondData from '../../interfaces/IMovieList';
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
    this.replaceVoteAverage(itemCard, movieData);
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

  replaceVoteAverage(itemCard: HTMLElement, movieData: IMovieData) {
    const voteAverage = getDomElement('.item-vote-average', itemCard);

    voteAverage.classList.add('item-vote-average');
    voteAverage.textContent = `${movieData.vote_average.toFixed(1)} `;
    voteAverage.appendChild(this.createStarElement());

    voteAverage.classList.toggle('skeleton');
  },

  createStarElement(): HTMLElement {
    const star = document.createElement('img');
    star.setAttribute('src', starFilled);
    star.alt = '별점';
    return star;
  },

  replaceMovieCardSkeleton(itemCard: HTMLElement, movieData: IMovieData) {
    if (movieData === undefined) {
      return itemCard.remove();
    }
    this.replaceThumbnail(itemCard, movieData);
    this.replaceTitle(itemCard, movieData);
    this.replaceVoteAverage(itemCard, movieData);
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

  createMovieItemVoteAverageSkeleton() {
    const movieItemVoteAverage = document.createElement('div');
    movieItemVoteAverage.classList.add('item-vote-average', 'skeleton');

    return movieItemVoteAverage;
  },
};

export default MovieItems;
