import { KEY } from '../constants/MOVIES_URL';

const generateMoviesUrl = (baseUrl: string, params?: object) => {
  const searchParamsURL = new URLSearchParams({
    api_key: KEY as string,
    language: 'ko-KR',
    ...params,
  });

  return baseUrl + searchParamsURL;
};

export default generateMoviesUrl;
