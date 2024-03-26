import { EndPointValues, QueryStringKeyValues } from '../consts/URL';

export const getUrlParams = (paramKey: QueryStringKeyValues) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramKey);
};

export const setEndpoint = (endPoint: EndPointValues) => {
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const pathSegmentsExceptLast = pathSegments.slice(0, -1);
  const newPath = [pathSegmentsExceptLast, endPoint].join('/');
  window.history.replaceState({}, '', newPath);
};

export const getEndpoint = () => {
  const path = window.location.pathname;
  const endpoint = path.substring(path.lastIndexOf('/'));

  return endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
};

export const setUrlParams = (paramKey: QueryStringKeyValues, paramValue: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(paramKey, paramValue);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

export const redirectToRoot = () => {
  const url = new URL(window.location.href);
  const baseUrl = url.origin;
  const lastSlashIndex = url.pathname.lastIndexOf('/');

  const beforeLastSlashIndex = url.pathname.lastIndexOf('/', lastSlashIndex - 1);
  const newPathname = beforeLastSlashIndex > 0 ? url.pathname.substring(0, beforeLastSlashIndex) : '/';

  window.location.href = `${baseUrl}${newPathname}`;
};
