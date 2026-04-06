export const SHOW_MORE_THROTTLE_MS = 500;

export const FETCH_TIMEOUT_MS = 10000;

export const FETCH_OPTION = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  }
}

export const ERROR: Record<string, string> = {
  APIError: "API 에러",
  UnknownError: "알 수 없는 에러",
}