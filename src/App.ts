import { Component } from './core/Component';

import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { renderMoreSkeletonList, renderSkeletonList } from './components/MovieList';

import { store } from './store';
import validator from './validation/validator';
import { $ } from './utils';
import { Modal, renderMovieDetail } from './components/MovieDetail';
export class App extends Component {
  template() {
    return `
        ${Header()}
        ${MainPage()}
        ${Modal()}
      `;
  }

  render() {
    this.$el.innerHTML = this.template();
    const $modal = $('.modal') as HTMLDialogElement;
    $modal.close();
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

          if (store.state.isPopular) store.setState({ isPopular: false });

          store.setState({ keyword: searchedKeyword });
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

    $el.querySelector('.item-list').addEventListener('click', (e) => {
      const $modal = $('.modal') as HTMLDialogElement;
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLParagraphElement) {
        $modal.show();
        const clickedMovieId = e.target.id;
        renderMovieDetail(clickedMovieId, $modal);
      }
    });
  }
}
