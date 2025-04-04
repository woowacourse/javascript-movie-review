import {
  API_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
} from '../constants/errorMessages';
import Logger from '../utils/logger/Logger';

export class ApiError extends Error {
  statusCode: number;
  apiErrorCode: number;
  name: string;

  constructor(message: string, statusCode: number, apiErrorCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.apiErrorCode = apiErrorCode;
    this.name = 'ApiError';
  }
}

export default class ApiClient {
  private apiToken: string;
  private baseUrl: string;

  constructor(apiToken: string, baseUrl: string) {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
  }

  async fetchData<T>(
    endpoint: string,
    params: Record<string, string>,
    options: {
      language?: string;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options.language) {
      url.searchParams.append('language', options.language);
    }

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url.toString(), fetchOptions);
      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          const logger = Logger.getInstance();
          logger.error(
            `인증 오류: ${errorData.status_code} - ${errorData.status_message}`,
          );
        }

        const errorMessage =
          API_ERROR_MESSAGES[response.status] ||
          errorData.status_message ||
          DEFAULT_ERROR_MESSAGE;

        throw new ApiError(
          errorMessage,
          response.status,
          errorData.status_code,
        );
      }
      return response.json();
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error(`API 요청 실패: ${url}`, error as Error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw error;
    }
  }
}
