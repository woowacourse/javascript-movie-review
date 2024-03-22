import HttpError from '../error/HttpError';
import isHTMLElement from '../utils/isHTMLElement';
import Skeleton from '../components/Skeleton/Skeleton';
import { Api, api } from '../api';
import removeHTMLElements from '../utils/removeHTMLElements';
import { checkDataLength } from '../components/ShowMoreButton/eventHandler';
import createElement from '../utils/createElement';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import { FetchOption } from '../types/fetch';

// function isHttpError(error: any): error is HttpError {
//   return error instanceof HttpError && typeof error.status === 'number';
// }

class LoadingOrErrorStateUIManager {
  api;

  SKELETON_LENGTH = 8;

  isLoading: boolean = false;

  constructor(api: Api) {
    this.api = api;
  }

  showErrorComponent(errorComponent: HTMLElement) {
    const main = document.querySelector('main');
    if (!isHTMLElement(main)) return;
    main.innerHTML = '';
    main.appendChild(errorComponent);
  }

  onErrorChanged(error: HttpError | null) {
    if (error) {
      console.log('onErrorChanged: ', error);
      const errorComponent = ErrorComponent(error.status);

      this.showErrorComponent(errorComponent);
    }
  }

  /* eslint-disable max-lines-per-function */
  /* eslint-disable  max-depth */
  async fetchData(url: string, { method = 'GET', body = null, headers = {} }: Partial<FetchOption>) {
    try {
      this.isLoading = true;
      this.onLoadingChanged();
      const data = await this.api.sendRequest(url, { method, body, headers });

      console.log(data);

      this.checkExistingData(data.results.length);

      this.isLoading = false;
      this.resetMovieList();

      return data;
    } catch (error: any) {
      // 여기가 문제 any타입으로 지정하면
      //  HttpError 클래스 내에
      // Object.setPrototypeOf(this, new.target.prototype);
      // 함수가 없어도 실행됨
      // 하지만 if(error instanceof HttpError) 이렇게 하면 안됨
      if (error) {
        this.resetMovieList();
        this.onErrorChanged(error);
      }
    }
  }

  checkExistingData(length: number) {
    if (!length) {
      checkDataLength(length);
      const section = document.querySelector('.item-view');
      if (!section) return;
      const h1 = createElement('h1', { textContent: '검색 결과가 존재하지 않습니다', className: 'error-text' });
      section.appendChild(h1);
    }
  }

  resetMovieList() {
    if (!this.isLoading) {
      removeHTMLElements('.skeleton');
    }
  }

  createSkeleton() {
    const fragment = document.createDocumentFragment();
    Array.from({ length: this.SKELETON_LENGTH }, () => {
      const skeleton = Skeleton();
      fragment.appendChild(skeleton);
    });

    return fragment;
  }

  onLoadingChanged() {
    const ul = document.querySelector('ul');
    if (isHTMLElement(ul) && this.isLoading) {
      const skeletonComponent = this.createSkeleton();
      ul.appendChild(skeletonComponent);
    }
  }
}

const loadingOrErrorStateUIManager = new LoadingOrErrorStateUIManager(api);

export default loadingOrErrorStateUIManager;
