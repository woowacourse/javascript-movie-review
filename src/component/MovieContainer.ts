import { $ } from '../util/selector';
import { createMovieItem, createSkeletonMovieItem } from './MovieItem';
import wrapItemWithLi from '../util/wrapItemWithLi';
import SkeletonCardList from './Skeleton/SkeletonCardList';
import removeAllChild from '../util/removeAllChild';
import isExistElement from '../util/isExistElement';
import { openModal } from './Modal/Modal';
import loader from '../asset/loader.gif';
import MovieService from '../domain/MovieService';
import { MovieData } from '../domain/MovieServiceType';

const LIST_LENGTH_UNIT = 20;

class MovieContainer {
  private movieContainer;
  private movieListContainer;
  private firstSkeletonItem: HTMLElement | null;
  private skeletonList;
  private api;

  constructor() {
    this.api = new MovieService('TMDB');
    this.movieContainer = $('section.item-view');
    this.movieListContainer = $('ul.item-list');
    this.firstSkeletonItem = null;
    this.skeletonList = new SkeletonCardList();

    this.renderSkeletonMovieList();

    this.attachListener();
  }

  private attachListener() {
    this.movieListContainer.addEventListener('click', async (event) => {
      // TODO: subject 방식 말고 다른 방식으로 리펙토링하기
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('li')?.classList.contains('skeleton')) return;

      const li$ = event.target.closest('li');
      const movieId = parseInt(li$?.id!);

      // TODO: 모달내부로 이동
      const movieDetail = await this.api.fetchMovieDetail(movieId);

      if (!movieDetail) return;

      openModal('movieDetail', movieDetail);
    });
  }

  private renderLoader() {
    const loader$ = document.createElement('img');
    loader$.src = loader;
    loader$.classList.add('loader');

    const observer$ = $('.loader-wrapper', this.movieContainer);
    observer$.append(loader$);
  }

  private renderSkeletonMovieList() {
    const skeletonMovieList = this.skeletonList.create(createSkeletonMovieItem);
    const wrappedSkeletonMovieListWithLi = wrapItemWithLi(skeletonMovieList);

    wrappedSkeletonMovieListWithLi.forEach((item) => {
      item.classList.add('skeleton');
      this.movieListContainer.append(item);
    });

    this.firstSkeletonItem = wrappedSkeletonMovieListWithLi[0]; // 새로운 아이템 push를 위한 진입점 마킹

    this.renderLoader();
  }

  // 결과 없음 알림 요소 토글, ul 클리어, 버튼 보임 여부 토글
  groundWorkForNewMovieList({ movieList, hasNextPage }: { movieList: Array<MovieData>; hasNextPage: boolean }) {
    try {
      const noticeNoDataElement = $('.notice-no-data', this.movieContainer);
      if (noticeNoDataElement && movieList.length !== 0) noticeNoDataElement.remove();
    } catch (e) {
      // 결과 없음 알림 요소가 없는 경우
      if (movieList.length === 0) this.noticeNoData();
    }

    if (!isExistElement('.skeleton', this.movieListContainer)) this.renderSkeletonMovieList();
    if (movieList.length === 0) this.clearMovieList();
    if (!hasNextPage) {
      this.clearMovieList();
      this.firstSkeletonItem = null;
    }
  }

  pushNewMovieList({ movieList, hasNextPage }: { movieList: Array<MovieData>; hasNextPage: boolean }) {
    this.groundWorkForNewMovieList({ movieList, hasNextPage });

    const movieItemList = movieList.map((movie) => createMovieItem(movie));
    const movieItemListWrappedByLi = wrapItemWithLi(movieItemList);
    movieItemListWrappedByLi.forEach((element, i) => element.setAttribute('id', movieList[i].id.toString()));

    if (this.firstSkeletonItem) movieItemListWrappedByLi.forEach((item) => this.firstSkeletonItem?.before(item));
    else movieItemListWrappedByLi.forEach((item) => this.movieListContainer.append(item));
  }

  clearMovieList() {
    if (this.movieListContainer.firstChild) removeAllChild(this.movieListContainer);

    const loaderWrapper$ = $('.loader-wrapper', this.movieContainer);

    if (loaderWrapper$.firstChild) removeAllChild(loaderWrapper$);
  }

  noticeNoData() {
    const noticeNoDataElement = document.createElement('h3');
    noticeNoDataElement.textContent = '결과가 존재하지 않습니다.';
    noticeNoDataElement.classList.add('notice-no-data');

    const mainTitle = $('.main-title');
    mainTitle.after(noticeNoDataElement);
  }
}

export default MovieContainer;
