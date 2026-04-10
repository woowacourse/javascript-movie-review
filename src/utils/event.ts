export const CUSTOM_EVENT = {
  ROUTE_CHANGE: 'ROUTE_CHANGE',
  SCROLL_END: 'SCROLL_END',
} as const;

export const dispatchRouteChange = (url: string) => {
  window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.ROUTE_CHANGE, { detail: { url } }));
};

const throttle: {
  delay: number;
  timer: ReturnType<typeof setTimeout> | null;
} = {
  delay: 300,
  timer: null,
};

export const scrollEvent = () => {
  if (throttle.timer) return;

  throttle.timer = setTimeout(() => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.SCROLL_END));
    throttle.timer = null;
  }, throttle.delay);
};
