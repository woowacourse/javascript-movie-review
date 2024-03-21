import '../templates/reset.css';
import '../templates/common.css';

import getHeader from './view/getHeader.ts';
import replaceMain from './view/getMain.ts';
import { POPULAR_MOVIES_URL } from './constants/tmdbConstants';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

async function renderMain() {
  await replaceMain(POPULAR_MOVIES_URL, { page: 1 });
}

async function run() {
  renderHeader();
  await renderMain();
}

run();
