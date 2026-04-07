const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY가 인증되지 않았습니다! 환경변수를 확인해주세요!');
}

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
  const queryStr = query ? 'query=' + query : '';
  const pageStr = '&page=' + page;
  const regionStr = '&region=' + 'ko-kR';
  const languageStr = '&language=' + 'ko';


  const resultUrl = url + '?' + queryStr + pageStr + regionStr + languageStr;

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
