import { redirectToPage } from '../../route/router';

type HTTPMethodOptions = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
  method: HTTPMethodOptions;
  body?: object;
}

export async function apiClient<T>(url: string, options: ApiClientOptions): Promise<T> {
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
    console.log(json);
    return json;
  } catch (err: unknown) {
    redirectToPage('/error');
    throw err;
  }
}
