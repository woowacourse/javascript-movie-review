// 커스텀이벤터패턴 나중에공부
export const CUSTOM_EVENT = {
  ROUTE_CHANGE: 'ROUTE_CHANGE',
  SCROOL_END: 'SCROOL_END',
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
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.SCROOL_END));
    throttle.timer = null;
  }, throttle.delay);
};
