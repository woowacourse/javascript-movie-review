import '../templates/reset.css';
import '../templates/common.css';

import getHeader from './view/getHeader.ts';
import getMain from './view/getMain.ts';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

function renderMain() {
  const main = getMain();
  const app = document.getElementById('app');
  app.appendChild(main);
}

function run() {
  renderHeader();
  renderMain();
}

run();
