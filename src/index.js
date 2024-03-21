import '../templates/reset.css';
import '../templates/common.css';
import './css/style.css';

import getHeader from './view/getHeader.ts';
import replaceMain from './view/getMain.ts';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

async function renderMain() {
  await replaceMain();
}

async function run() {
  renderHeader();
  await renderMain();
}

run();
