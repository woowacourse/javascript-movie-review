import { Component } from './core/Component';

import { Header } from './components/Header';
import { MainPage } from './components/MainPage';

import { publisher } from './store/publisher';
import { renderMoreSkeletonList, renderSkeletonList } from './components/MovieList';

export class App extends Component {
  template() {
    return `
        ${Header()}
        ${MainPage()}
      `;
  }
  setEvent() {
    const { $el } = this;

    $el.querySelector('#home-logo').addEventListener('click', () => {
      window.location.href = '/';
    });

    $el.querySelector('.search-box').addEventListener('submit', (event: Event) => {
      event.preventDefault();
      if (event.target instanceof HTMLFormElement) {
        if (publisher.state.isPopular) publisher.setState({ isPopular: false });

        const searchedKeyword = event.target['keyword'].value;

        publisher.setState({ keyword: searchedKeyword });

        renderSkeletonList();

        publisher.setState({ page: 1 });
      }
    });

    $el.querySelector('.view-more-button').addEventListener('click', () => {
      renderMoreSkeletonList();
    });
  }
}
