import { apiUrl, apiKey } from "../constants/env";

export type Method = 'get' | 'post' | 'put' | 'delete';

export type Configs = {
  method?: Method | undefined;
  url?: string | undefined;
  params?: Record<string, unknown> | undefined;
  query?: Record<string, unknown> | undefined;
  data?: Record<string, unknown> | undefined;
  headers?: Record<string, unknown> | undefined;
};

export const requestAjax = async (
  url: string,
  config?: Configs,
): Promise<RequestFetchResponse> => {
  const { method = 'get', url: configUrl, params, query, data, headers } = config || {};

  let finalUrl = `${apiUrl}${configUrl || url}`;

  if (params) {
    const paramsstring = Object.values(params).join('/');
    finalUrl += `/${paramsstring}`;
  }

  if (query) {
    const querystring = new URLSearchParams(query as Record<string, string>).toString();
    finalUrl += `?${querystring}`;
  }

  const customHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    ...headers,
  };

  try {
    const res = await fetch(finalUrl, {
      method,
      ...(!!Object.values(customHeaders).filter(Boolean).length && {
        headers: {
          ...customHeaders as Record<string, string>,
        }
      }),
      // credentials: 'include',
      ...(data && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });

    let responseData;
    try {
      responseData = await res.json();
    } catch (e) {
      console.error(e);
      responseData = await res.text();
    }

    const response = {
      data: responseData,
      status: res.status,
      headers: customHeaders,
      config,
    };

    if (res.ok) {
      return response;
    } else {
      throw new RequestFetchError(response);
    }
  } catch(error) {
    console.error(error);
  }
};

export type RequestFetchResponse = {
  data: any;
  status: number;
  headers?: Record<string, unknown> | undefined;
  config?: Configs | undefined;
};

export class RequestFetchError extends Error {
  status: number;
  data?: unknown;
  headers?: unknown;
  config?: unknown;
  constructor(error: { data: unknown; status: number; headers: unknown; config: unknown }) {
    super('RequestFetchError');
    this.data = error.data;
    this.status = error.status;
    this.headers = error.headers;
    this.config = error.config;
  }
}
