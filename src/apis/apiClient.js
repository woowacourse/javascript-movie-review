import { API } from '../constants/constant';
import errorHandler from '../utils/errorHandler';

const API_KEY = process.env.API_KEY;

const ApiClient = {
  async get(endpoint, queryParams = {}, headers = {}) {
    const url = this.buildUrl(endpoint, queryParams);
    return this.request('GET', url, null, headers);
  },

  async post(endpoint, body, headers = {}) {
    const url = `${API.URL}${endpoint}`;
    return this.request('POST', url, body, headers);
  },

  async put(endpoint, body, headers = {}) {
    const url = `${API.URL}${endpoint}`;
    return this.request('PUT', url, body, headers);
  },

  async delete(endpoint, headers = {}) {
    const url = `${API.URL}${endpoint}`;
    return this.request('DELETE', url, null, headers);
  },

  async request(method, url, body = null, headers = {}) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    };

    try {
      // 오프라인 확인
      window.addEventListener("offline", () => {
        throw new Error('offline');
      });

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_code);
      }

      return data;
    } catch (error) {
      errorHandler(error.message);
      throw error;
    }
  },

  buildUrl(endpoint, queryParams = {}) {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: API.LANGUAGE,
      ...queryParams
    });

    return `${API.URL}${endpoint}?${params}`;
  }
};

export default ApiClient;