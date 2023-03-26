import { Store } from '..';
import { getMovieDetail, getPopularMovies, searchMovies } from '../service/movie';
import { Movie, MoviesResponse } from '../service/types';
import MovieCard from './MovieCard';
import MovieDetailModal from './MovieDetailModal';

export default class MovieList {
  io: any;
  handleClickMovieCard = (e: Event) => {};
  $parent: HTMLElement;
  $title: HTMLHeadElement;
  $movieItemList: HTMLUListElement;
  $moreMovieButton: HTMLButtonElement;
  $lastPageNotify: HTMLParagraphElement;
  $skeletonDiv: HTMLDivElement;

  constructor($parent: HTMLElement) {
    this.$parent = $parent;

    this.$parent.insertAdjacentHTML('beforeend', this.template());
    this.$title = this.$parent.querySelector('#js-movie-list-title') as HTMLHeadElement;
    this.$movieItemList = this.$parent.querySelector('#js-movie-list') as HTMLUListElement;
    this.$moreMovieButton = this.$parent.querySelector(
      '#js-more-movie-button',
    ) as HTMLButtonElement;
    this.$lastPageNotify = this.$parent.querySelector(
      '#js-last-page-notify',
    ) as HTMLParagraphElement;
    this.$skeletonDiv = this.$parent.querySelector('#js-movie-list-skeleton') as HTMLDivElement;
  }

  template() {
    return `
      <main>
        <section class="item-view">
          <h2 id="js-movie-list-title">지금 인기 있는 영화</h2>
          <ul id="js-movie-list" class="item-list"></ul>
        </section>
        <button id="js-more-movie-button" class="btn primary full-width">더 보기</button>
        <p id='js-last-page-notify'>마지막 페이지입니다</p>
      </main>
    `;
  }

  skeletonTemplate() {
    return `
      <li class='skeleton-li'>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </li>
    `;
  }

  async requestAndRenderMovieCards(getMovieRequest: () => Promise<MoviesResponse>) {
    this.showSkeleton();
    const { results, total_pages } = await getMovieRequest();
    this.removeSkeleton();
    this.renderMovieCards(results, total_pages);
  }

  bindEvent(getMovieRequest: () => Promise<MoviesResponse>) {
    // 무한스크롤 이벤트
    const handleMoreMovie = async () => {
      Store.page += 1;
      await this.requestAndRenderMovieCards(getMovieRequest);
    };

    this.io = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        handleMoreMovie();
      },
      { rootMargin: '100%' },
    );
    this.io.observe(this.$moreMovieButton);

    // 모달 이벤트
    this.handleClickMovieCard = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      const $itemCard = e.target.closest('.js-item-card');
      if (
        !$itemCard ||
        !this.$movieItemList.contains($itemCard) ||
        !($itemCard instanceof HTMLElement) ||
        !$itemCard.dataset.id
      )
        return;
      // 각 카드에 맞게 api 요청 후 모달 창 띄우기
      getMovieDetail({ movie_id: Number($itemCard.dataset.id) }).then((movieDetail) => {
        const $detailModal = new MovieDetailModal(this.$parent, movieDetail);
        $detailModal.bindEvent();

        $detailModal.show();
      });
    };

    this.$movieItemList.addEventListener('click', this.handleClickMovieCard);
  }

  renderTitle(title: string) {
    this.$title.textContent = title;
  }

  renderMovieCards(movies: Movie[], totalPages: number) {
    movies.forEach((movie) => {
      new MovieCard(this.$movieItemList, movie);
    });

    this.$moreMovieButton.style.display = totalPages > Store.page ? 'block' : 'none';
    this.$lastPageNotify.style.display = totalPages > Store.page ? 'none' : 'block';
  }

  removeMovieCards() {
    this.io.unobserve(this.$moreMovieButton);
    this.$movieItemList.removeEventListener('click', this.handleClickMovieCard);
    this.$movieItemList.innerHTML = '';
  }

  removeSkeleton() {
    const $skeletonLists = this.$movieItemList.querySelectorAll('.skeleton-li');

    $skeletonLists.forEach(($skeletonList) => $skeletonList.remove());
  }

  showSkeleton() {
    this.$movieItemList.insertAdjacentHTML('beforeend', this.skeletonTemplate().repeat(20));
  }
}
