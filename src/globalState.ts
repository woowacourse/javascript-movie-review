import { POPULAR_MOVIES_URL } from './constants/tmdbConstants';

interface IGlobalState {
  url: string;
  page: number;
  query: string;
}

const globalState: IGlobalState = {
  url: POPULAR_MOVIES_URL,
  page: 1,
  query: '',
};

export default globalState;
