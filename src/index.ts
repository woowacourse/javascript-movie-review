import '../reset.css';
import '../common.css';

import './assets/images/search_button.png';
import './assets/images/logo.png';
import './assets/images/star_empty.png';
import './assets/images/star_filled.png';

import App from './components/App/App';

const app = new App();
document.body.appendChild(app.$target);
