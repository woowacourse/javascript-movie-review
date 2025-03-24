import { redirectToPage } from '../route/router';

type HTTPMethodOptions = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
  method: HTTPMethodOptions;
  body?: object;
}

export async function apiClient(url: string, options: ApiClientOptions) {
  const requestOptions: RequestInit = {
    method: options.method,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  if (options.body && options.method !== 'GET') {
    requestOptions.body = JSON.stringify(options.body);
  }

  try {
    const res = await fetch(url, requestOptions);
    const json = await res.json();
    return json;
  } catch (err: unknown) {
    if (err instanceof Error) {
      redirectToPage('/error');
    }
  }
}
