import '../templates/reset.css';
import '../templates/common.css';

import getHeader from './view/getHeader';

function renderHeader() {
  const header = getHeader();
  const app = document.getElementById('app');
  app.prepend(header);
}

function run() {
  renderHeader();
}

run();
