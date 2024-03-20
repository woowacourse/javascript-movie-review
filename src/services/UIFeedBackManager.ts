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
      console.log('!isLoading');
      const skeletons = document.querySelectorAll('.skeleton');
      skeletons.forEach((skeleton) => {
        if (skeleton && skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
      });
    }
  }

  onLoadingChanged(isLoading: boolean) {
    const ul = document.querySelector('ul');

    if (isHTMLElement(ul) && isLoading) {
      console.log('isLoading');
      const fragment = document.createDocumentFragment();
      Array.from({ length: this.SKELETON_LENGTH }, () => {
        const skeleton = Skeleton();
        fragment.appendChild(skeleton);
      });

      ul.appendChild(fragment);
    }
  }
}

const uiFeedBackManager = new UIFeedBackManager(tmdbApi);

export default uiFeedBackManager;
