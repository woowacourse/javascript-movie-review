import { HttpClientError } from './HttpClientError';

export class HttpClientNetworkError extends HttpClientError {
  constructor(message = '네트워크에 연결되어 있지 않습니다') {
    super(message);
  }
}
