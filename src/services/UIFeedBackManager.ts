import tmdbApi from '../api/index';
import HttpError from '../error/HttpError';
import isHTMLElement from '../utils/isHTMLElement';
import Skeleton from '../components/Skeleton/Skeleton';
import { TMDBApi } from '../api/index';

class UIFeedBackManager {
  api;

  SKELETON_LENGTH = 8;

  constructor(api: TMDBApi) {
    this.api = api;
  }

  showErrorComponent(message: string) {
    const errorElement = document.createElement('div');
    errorElement.style.color = 'red';
    errorElement.innerText = message;

    document.body.insertBefore(errorElement, document.body.firstChild);
  }

  onErrorChanged(error: HttpError | null) {
    if (error instanceof HttpError) {
      this.showErrorComponent(error.message);
    }
  }

  /* eslint-disable max-lines-per-function */
  /* eslint-disable  max-depth */
  async fetchData(url: string, method = 'GET', body = null, headers = {}) {
    try {
      this.api.isLoading = true;
      this.onLoadingChanged(this.api.isLoading);
      const data = await this.api.sendRequest(url, method, body, headers);

      this.api.isLoading = false;
      this.resetMovieList(this.api.isLoading);

      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        this.resetMovieList(false);
        this.onErrorChanged(error);
      }
    }
  }

  resetMovieList(isLoading: boolean) {
    if (!isLoading) {
      const skeletons = document.querySelectorAll('.skeleton');
      skeletons.forEach((skeleton) => {
        if (skeleton && skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
      });
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

  onLoadingChanged(isLoading: boolean) {
    const ul = document.querySelector('ul');
    if (isHTMLElement(ul) && isLoading) {
      const skeletonComponent = this.createSkeleton();
      ul.appendChild(skeletonComponent);
    }
  }
}

const uiFeedBackManager = new UIFeedBackManager(tmdbApi);

export default uiFeedBackManager;
