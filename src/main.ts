import App from './App';
import { eventHandlerInstance } from './modules';
import { $ } from './utils';

addEventListener('load', async () => {
  $('#app').appendChild(new App().element);
  eventHandlerInstance.attachEventListener();
});
