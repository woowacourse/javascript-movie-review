import App from './App';
import { eventHandlerInstance } from './lib/modules';
import { $ } from './lib/utils';

addEventListener('load', async () => {
  $('#app').appendChild(new App().element);
  eventHandlerInstance.attachEventListener();
});
