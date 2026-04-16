export const SHOW_MORE_THROTTLE_MS = 500;

export const FETCH_OPTION = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  timeoutMs: 10000
}

export const RATING_OPTIONS = [2, 4, 6, 8, 10];

export const RATING_MESSAGES = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} 
