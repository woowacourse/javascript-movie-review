import HttpError from '../error/HttpError';
import isHTMLElement from '../utils/isHTMLElement';
import Skeleton from '../components/Skeleton/Skeleton';
import { Api, api } from '../api';
import removeHTMLElements from '../utils/removeHTMLElements';
import { checkDataLength } from '../components/ShowMoreButton/eventHandler';
import createElement from '../utils/createElement';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import { FetchOption } from '../types/fetch';
import isHttpError from '../utils/isHttpError';

class MovieFetcherWithLoadingOrErrorState {
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
      this.checkExistingData(data.results.length);

      this.isLoading = false;
      this.resetMovieList();

      return data;
    } catch (error) {
      if (isHttpError(error)) {
        this.resetMovieList();
        this.onErrorChanged(error);
      }
    }
  }

  checkExistingData(length: number) {
    removeHTMLElements('.error-text');
    if (!length) {
      checkDataLength(length);
      const section = document.querySelector('.item-view');
      if (!section) return;
      const errorText = createElement('p', { textContent: '검색 결과가 존재하지 않습니다', className: 'error-text' });
      section.appendChild(errorText);
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

const movieFetcherWithLoadingOrErrorState = new MovieFetcherWithLoadingOrErrorState(api);

export default movieFetcherWithLoadingOrErrorState;
