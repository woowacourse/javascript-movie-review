import '../css/common.css';
import '../css/reset.css';

import MovieListManager from './domain/MovieListManager';
import { $ } from './util/querySelector';
import Header from './components/Header';
import Main from './components/Main';
import EventBus from './util/EventBus';

const manager = new MovieListManager();

const header = new Header(manager, $('header'));
header.render();

const main = new Main($('.item-view'), manager);
main.render();

EventBus.subscribe('searchFullfilled', main.render.bind(main));
