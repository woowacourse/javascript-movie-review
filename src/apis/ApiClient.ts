import { isError, isString } from '@/lib/utils';

type HttpMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT';
type FetchURLParameterType = Parameters<typeof fetch>[0];

export default class ApiClient {
  static async get<TResponse>(url: FetchURLParameterType, options: RequestInit) {
    return this.#request('GET', url, options) as TResponse;
  }

  static async #request(method: HttpMethodType, url: FetchURLParameterType, options: RequestInit) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          ...options.headers,
        },
        ...options,
      });
      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error('사용자 정보가 잘못되었습니다.');
          case 400:
            throw new Error('페이지를 초과했습니다.');
        }
      }

      return data;
    } catch (error) {
      if (isError(error)) throw error;
      if (isString(error)) throw new Error(error);

      console.error(error);
    }
  }
}
