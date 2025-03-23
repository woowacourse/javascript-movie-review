import App from './App';
import { $ } from './lib/utils';

addEventListener('load', async () => {
  $('#app').appendChild(new App().element);
});
