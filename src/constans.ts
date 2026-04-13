export const FETCH_OPTION = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  }
}

export const SHOW_MORE_TROTTLE_MS = 500;

export const FETCH_TIMEOUT_MS = 10000;