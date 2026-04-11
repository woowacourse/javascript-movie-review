import { apiUrl, apiKey } from "../constants/env";

interface Configs {
  method?: 'get' | 'post' | 'put' | 'delete';
  query?: Record<string, unknown>;
}

export const requestAjax = async (
  url: string,
  { method, query }: Configs = { method: 'get' }
) => {
  const queryString = query ? '?' + new URLSearchParams(query as any).toString() : '';
  const fullPathUrl = `${apiUrl}${url}${queryString}`;
  const res = await fetch(fullPathUrl, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) {
    return await res.json();
  }

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
}

export class ApiError extends Error {
  status_code: number;

  constructor(message: string, status_code: number) {
    super(message);
    this.name = "ApiError";
    this.status_code = status_code;
  }
}
