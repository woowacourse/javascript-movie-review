import { Component } from './core/Component';

import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { IEvent, Event } from './utils';
import { renderSkeletonList } from './components/MovieList';

export class App extends Component {
  events: IEvent[] = [];

  template() {
    return `
        ${Header()}
        ${MainPage()}
      `;
  }

  setEvent() {
    Event.setAllEvents();
  }
}
