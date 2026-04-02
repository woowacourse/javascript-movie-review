const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface resultData {
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
}


export interface PreviewData {
  page: number;
  results: resultData[];
  total_pages: number;
}

export interface Params {
  page: number;
  query?: string | undefined;
  language?: string;
  region?: string;
}

export interface Request {
  path: string;
  params: Params;
}
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchAPI = async (req: Request): Promise<PreviewData> => {
  const url = BASE_URL + req.path;

  const { query, page } = req.params;
  const params = new URLSearchParams({ language: 'en-US', page: String(page) });
  if (query) params.set('query', query);

  const resultUrl = url + '?' + params.toString();

  const response = await fetch(resultUrl, options);

  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
  }

  const data = (await response.json()) as PreviewData;
  return data;
};

export const fetchSearchMovies = (query: string, page: number = 1): Promise<PreviewData> => {
  return fetchAPI({
    path: '/search/movie',
    params: { query, page },
  });
};

export const fetchPopularMovies = (page: number = 1): Promise<PreviewData> => {
  return fetchAPI({
    path: '/movie/popular',
    params: { page },
  });
};
