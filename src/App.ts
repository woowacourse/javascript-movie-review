import { Footer, Header, Movies, Toast } from './components';
import { Component } from './components/core';
import { TOAST_TYPE } from './components/Toast';
import { eventHandlerInstance } from './modules';
import { toastMessage } from './modules/Message';
import { html } from './utils';

export default class App extends Component {
  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  async onRender() {
    this.fillSlot(new Header(), 'header');
    this.fillSlot(new Movies(), 'movies');
    this.fillSlot(new Footer(), 'footer');
  }

  addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'offline',
      callbackWindow: () => {
        new Toast({ message: toastMessage.get('offline'), type: TOAST_TYPE.error }).show();
      },
    });

    eventHandlerInstance.addEventListener({
      eventType: 'online',
      callbackWindow: () => {
        new Toast({ message: toastMessage.get('online'), type: TOAST_TYPE.success }).show();
      },
    });
  }
}
