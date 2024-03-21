import { POPULAR_MOVIES_URL } from './constants/tmdbConstants';

interface IGlobalState {
  url: string;
  page: number;
  query: string;
}

interface IGlobalStateMethod {
  setUrl: (url: string) => void;
  getUrl: () => string;
  initializePage: () => void;
  increasePage: () => void;
  getPage: () => number;
  setQuery: (query: string) => void;
  getQuery: () => string;
}

const globalState: IGlobalState = {
  url: POPULAR_MOVIES_URL,
  page: 1,
  query: '',
};

const globalStateMethod: IGlobalStateMethod = {
  setUrl: (url) => {
    globalState.url = url;
  },
  getUrl: () => globalState.url,
  getPage: () => globalState.page,
  initializePage: () => {
    globalState.page = 1;
  },
  increasePage: () => {
    globalState.page += 1;
  },
  setQuery: (query) => {
    globalState.query = query;
  },
  getQuery: () => globalState.query,
};

export default globalStateMethod;
