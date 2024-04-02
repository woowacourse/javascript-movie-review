import { EndPointValues, QueryStringKeyValues } from '../consts/URL';

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

export const getUrlParams = (paramKey: QueryStringKeyValues) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramKey);
};

export const setUrlParams = (paramKey: QueryStringKeyValues, paramValue: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(paramKey, paramValue);
  window.history.replaceState({}, '', `${process.env.PUBLIC_PATH}?${urlParams}`);
};

export const redirectToRoot = () => {
  window.history.replaceState({}, '', process.env.PUBLIC_PATH);
};

export const deleteUrlParams = (paramKey: QueryStringKeyValues) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(paramKey);
  const newUrl = `${url.pathname}${url.search}`;

  window.history.replaceState({}, '', newUrl);
};
