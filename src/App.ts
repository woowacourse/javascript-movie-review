import { Footer, Header, Movies, Toast } from './components';
import { Component } from './components/core';
import { TOAST_TYPE } from './components/Toast';
import { eventHandlerInstance } from './modules';
import { html } from './utils';

export default class App extends Component<null> {
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
        new Toast({ message: '네트워크 오프라인이 감지되었습니다.', type: TOAST_TYPE.error }).show();
      },
    });

    eventHandlerInstance.addEventListener({
      eventType: 'online',
      callbackWindow: () => {
        new Toast({ message: '네트워크가 연결되었습니다.', type: TOAST_TYPE.success }).show();
      },
    });
  }
}
