import '../css/reset.css';
import '../css/common.css';

import MovieListManager from './domain/MovieListManager';
import { $ } from './util/querySelector';
import Header from './components/Header';
import Main from './components/Main';
import EventBus from './util/EventBus';
import LocalStorage from './util/LocalStorage.ts';
import MovieModal from './components/MovieModal';
import GenreMap from './domain/GenreMap';
import MovieSkeleton from './components/MovieSkeleton';
import RatingManager from './domain/RatingManager';
import StarRating from './components/StarRating';

const SKELETON_ITEM_COUNT = 20;

const listManager = new MovieListManager(LocalStorage);
const ratingManager = new RatingManager();

const header = new Header(listManager, $('header'));
header.render();

const skeleton = new MovieSkeleton($('#skeleton-container'));
skeleton.render(SKELETON_ITEM_COUNT);

const main = new Main($('.item-view'), listManager);

const modal = new MovieModal($('#movie-modal'));

const star = new StarRating($('.star'), ratingManager);

EventBus.subscribe('searchFullfilled', main.render.bind(main));
EventBus.subscribe('searchFullfilled', skeleton.hide.bind(skeleton));

EventBus.subscribe('searchPending', skeleton.show.bind(skeleton));

EventBus.subscribe('summaryClick', modal.catchMovieIdEvent.bind(modal));
EventBus.subscribe('summaryClick', star.catchMovieIdEvent.bind(star));

const scrollButton = $('button#scroll-to-top');
$('img', scrollButton).setAttribute('src', './assets/up_arrow.png');
scrollButton.addEventListener('click', () => {
  $('html').scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('beforeunload', () => {
  LocalStorage.setItem('myRatings', ratingManager.toString());
});

window.addEventListener('load', async () => {
  const myRatings = JSON.parse(LocalStorage.getItem('myRatings') || '{}');

  Object.entries(myRatings).forEach(([movieId, rating]) => {
    ratingManager.setRating(Number(movieId), rating);
  });

  await GenreMap.fetch();
  main.render();
});
