import HttpError from '../error/HttpError';
import isHTMLElement from '../utils/isHTMLElement';
import Skeleton from '../components/Skeleton/Skeleton';
import { Api, api } from '../api';
import removeHTMLElements from '../utils/removeHTMLElements';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import { FetchOption } from '../types/fetch';
import isHttpError from '../utils/isHttpError';

class MovieFetcher {
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
      this.showErrorComponent(ErrorComponent(error.status));
    }
  }

  /* eslint-disable max-lines-per-function */
  /* eslint-disable  max-depth */
  async fetchData(url: string, { method = 'GET', body = null, headers = {} }: Partial<FetchOption>) {
    try {
      this.isLoading = true;
      this.onLoadingChanged();
      const data = await this.api.sendRequest(url, { method, body, headers });

      this.isLoading = false;
      this.resetMovieList();

      return data;
    } catch (error: any) {
      if (isHttpError(error)) {
        this.resetMovieList();
        this.onErrorChanged(error);
      } else if (error instanceof TypeError) {
        this.resetMovieList();
        this.onErrorChanged(new HttpError(error.message, 503));
      }
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

const movieFetcher = new MovieFetcher(api);

export default movieFetcher;
