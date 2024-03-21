import tmdbApi from '../api/index';
import HttpError from '../error/HttpError';
import isHTMLElement from '../utils/isHTMLElement';
import Skeleton from '../components/Skeleton/Skeleton';
import { TMDBApi } from '../api/index';
import removeHTMLElements from '../utils/removeHTMLElements';
import { checkDataLength } from '../components/ShowMoreButton/eventHandler';
import createElement from '../utils/createElement';
import Error from '../components/Error/Error';
class UIFeedBackManager {
  api;

  SKELETON_LENGTH = 8;

  isLoading: boolean = false;

  constructor(api: TMDBApi) {
    this.api = api;
  }

  showErrorComponent(errorComponent: HTMLElement) {
    const main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = '';
    main.appendChild(errorComponent);
  }

  onErrorChanged(error: HttpError | null) {
    if (error instanceof HttpError) {
      const errorComponent = Error(error.status);

      this.showErrorComponent(errorComponent);
    }
  }

  /* eslint-disable max-lines-per-function */
  /* eslint-disable  max-depth */
  async fetchData(url: string, method = 'GET', body = null, headers = {}) {
    try {
      this.isLoading = true;
      this.onLoadingChanged();
      const data = await this.api.sendRequest(url, method, body, headers);

      this.checkExistingData(data.results.length);

      this.isLoading = false;
      this.resetMovieList();

      return data;
    } catch (error) {
      if (error instanceof HttpError) {
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

const uiFeedBackManager = new UIFeedBackManager(tmdbApi);

export default uiFeedBackManager;
