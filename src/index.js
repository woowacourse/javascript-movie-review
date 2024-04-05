import '../templates/reset.css';
import '../templates/common.css';
import './style/responsive.css';
import './style/skeleton.css';
import './style/style.css';
import './style/starHover.css';

import getHeader from './view/getHeader.ts';
import { replaceMain } from './view/main';
import { addScrollEvent } from './view/event/scrollEvent';
import renderTopButton from './view/main/topButton';
import { addResizeEvent } from './view/event/resizeEvent';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

function renderMain() {
  replaceMain();
  renderTopButton();
}

function run() {
  renderHeader();
  renderMain();
  addScrollEvent();
  addResizeEvent();
}

run();
