import { Component } from './core/Component';

import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { renderMoreSkeletonList, renderSkeletonList } from './components/MovieList';
<<<<<<< HEAD
import { Modal, renderMovieDetail } from './components/MovieDetailModal';

import { store } from './store';
import validator from './validation/validator';
import { $ } from './utils';
=======

import { store } from './store';
import validator from './validation/validator';
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
export class App extends Component {
  template() {
    return `
        ${Header()}
        ${MainPage()}
<<<<<<< HEAD
        ${Modal()}
      `;
  }

  render() {
    this.$el.innerHTML = this.template();
    const $modal = $('.modal') as HTMLDialogElement;
    $modal.close();
  }

  setEvent() {
    this.setLogoClickEvent();
    this.setSearchSumbitEvent();
    this.setMovieItemClickEvent();
    this.setScrollEvent();
  }

  setLogoClickEvent() {
=======
      `;
  }
  setEvent() {
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
    const { $el } = this;

    $el.querySelector('#home-logo').addEventListener('click', () => {
      window.location.href = '/';
    });
<<<<<<< HEAD
  }

  setSearchSumbitEvent() {
    const { $el } = this;
=======
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790

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
<<<<<<< HEAD
  }

  setMovieItemClickEvent() {
    const { $el } = this;
    $el.querySelector('.item-list').addEventListener('click', (e) => {
      const $modal = $('.modal') as HTMLDialogElement;
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLParagraphElement) {
        $modal.show();
        const clickedMovieId = e.target.id;
        renderMovieDetail(clickedMovieId, $modal);
      }
    });
  }

  setScrollEvent() {
    window.onscroll = function (e) {
      if (!store.state.isContentEnd) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          renderMoreSkeletonList();
        }
      }
    };
  }
=======

    $el.querySelector('.view-more-button').addEventListener('click', () => {
      renderMoreSkeletonList();
    });
  }
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
}
