import { Component } from './core/Component';

import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { renderMoreSkeletonList, renderSkeletonList } from './components/MovieList';

import { store } from './store';
import validator from './validation/validator';
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
        const searchedKeyword = event.target['keyword'].value;

        try {
          validator.checkKeyword(searchedKeyword);

          if (store.state.isPopular) store.setState({ isPopular: false, keyword: searchedKeyword });

          renderSkeletonList();
          store.setState({ page: 1 });
        } catch (err) {
          alert(err);

          event.target['keyword'].value = '';
          event.target['keyword'].focus();
        }
      }
    });

    $el.querySelector('.view-more-button').addEventListener('click', () => {
      renderMoreSkeletonList();
    });
  }
}
