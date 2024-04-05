import UserNotifyPage from '../components/UserNotifyPage';

interface optionsType {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}

const POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=';
const DETAIL_URL = 'https://api.themoviedb.org/3/movie/';
const GET_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

/* eslint-disable max-lines-per-function */
const MovieApi = {
  async fetchData(url: string, options: optionsType) {
    const responseData = await fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          new UserNotifyPage(String(response.status)).renderError();
        }
        const responseJSON = await response.json();

        // 검색 결과가 없는 경우
        if (String(response.status)[0] === '2' && responseJSON.results.length === 0) {
          new UserNotifyPage(String(response.status)).renderError();
        }
        return responseJSON;
      })
      .catch((err) => console.error(err));

    return responseData;
  },

  async getPopularMovies(page: number) {
    const url = `${POPULAR_URL}${page}`;
    const responseData = await this.fetchData(url, GET_OPTIONS);

    return responseData;
  },

  async getSearchData(query: string, page: number) {
    const url = `${SEARCH_URL}${query}&include_adult=false&language=ko&page=${page}`;
    const responseData = await this.fetchData(url, GET_OPTIONS);

    return responseData;
  },

  async getDetailData(movieId: number) {
    const url = `${DETAIL_URL}${movieId}?language=ko-KR`;
    const responseData = await fetch(url, GET_OPTIONS).then((response) => response.json());

    return responseData;
  },
};

export default MovieApi;
