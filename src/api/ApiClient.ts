import MessageDisplay from '../component/MessageDisplay';
import { BASE_URL } from '../constant';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

export default class ApiClient {
  static async get(endpoint: string, headers = {}) {
    return this.request('GET', endpoint, headers);
  }

  static handleError() {
    const skeleton = $('.skeleton');
    skeleton?.remove();

    const errorUI = createDOMElement({
      tag: 'div',
      className: 'error-ui',
      children: [MessageDisplay({ text: '새로고침을 해주세요!' })]
    });

    $('.container')?.replaceChildren(errorUI);
  }

  static async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, headers = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        ...headers
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
