import App from './components/App';

import { $ } from './utils/domHelper';

// css
import '../templates/reset.css';
import '../templates/common.css';

new App($('#app')).render();
