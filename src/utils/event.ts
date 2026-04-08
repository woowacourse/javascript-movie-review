// 커스텀이벤터패턴 나중에공부
export const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

export const dispatchRouteChange = (url: string) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: { url } }));
};
