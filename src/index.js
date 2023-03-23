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

const SKELETON_ITEM_COUNT = 20;

GenreMap.fetch();

const manager = new MovieListManager(LocalStorage);

const header = new Header(manager, $('header'));
header.render();

const skeleton = new MovieSkeleton($('#skeleton-container'));
skeleton.render(SKELETON_ITEM_COUNT);

const main = new Main($('.item-view'), manager);
main.render();

const modal = new MovieModal($('#movie-modal'));

EventBus.subscribe('searchFullfilled', main.render.bind(main));
EventBus.subscribe('searchPending', skeleton.show.bind(skeleton));
EventBus.subscribe('searchFullfilled', skeleton.hide.bind(skeleton));
EventBus.subscribe('summaryClick', modal.catchMovieIdEvent.bind(modal));

const scrollButton = $('button#scroll-to-top');
scrollButton.addEventListener('click', () => {
  $('html').scrollTo({ top: 0, behavior: 'smooth' });
});
