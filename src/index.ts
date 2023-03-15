import { render } from './core';
import { App } from './components/App';
import { $ } from './utils/common/domHelper';
import '../src/styles/reset.css';
import '../src/styles/common.css';
import '../src/assets/search_button.png';
import '../src/assets/logo.png';

render(App, $('#app'));
