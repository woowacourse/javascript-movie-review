export const getUrlParams = (paramKey: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramKey);
};

export const setEndpoint = (endPoint: string) => {
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const newPath = [pathSegments[0], endPoint].join('/');
  window.history.replaceState({}, '', newPath);
};

export const getEndpoint = () => {
  const path = window.location.pathname;
  const endpoint = path.substring(path.lastIndexOf('/'));

  return endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
};

export const setUrlParams = (paramKey: string, paramValue: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(paramKey, paramValue);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

export const deleteParams = (paramKey: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(paramKey);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};
