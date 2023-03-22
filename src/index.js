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

GenreMap.fetch();

const manager = new MovieListManager(LocalStorage);

const header = new Header(manager, $('header'));
header.render();

const main = new Main($('.item-view'), manager);
main.render();

const modal = new MovieModal($('#movie-modal'));

EventBus.subscribe('searchFullfilled', main.render.bind(main));
EventBus.subscribe('searchPending', main.renderSkeleton.bind(main));
EventBus.subscribe('summaryClick', modal.catchMovieIdEvent.bind(modal));
