import '../templates/reset.css';
import '../templates/common.css';
import './css/style.css';

import getHeader from './view/getHeader.ts';
import { replaceMain } from './view/main';
import { addScrollEvent } from './view/scrollEvent';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

function renderMain() {
  addScrollEvent();
  replaceMain();
}

function run() {
  renderHeader();
  renderMain();
}

run();
