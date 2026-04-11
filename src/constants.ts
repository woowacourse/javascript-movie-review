export const SHOW_MORE_THROTTLE_MS = 500;

export const FETCH_OPTION = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  timeoutMs: 10000
}

export const RATING_OPTIONS = [2, 4, 6, 8, 10];