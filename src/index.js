import '../templates/reset.css';
import '../templates/common.css';
import './css/style.css';

import getHeader from './view/getHeader.ts';
import { replaceMain } from './view/main';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

function renderMain() {
  replaceMain();
}

function run() {
  renderHeader();
  renderMain();
}

run();
