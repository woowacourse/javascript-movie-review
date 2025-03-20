import MessageDisplay from '../component/MessageDisplay';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import { IMovie } from '../type';
import { BASE_URL } from './constant';
import { Response } from './type';

interface SearchMoviesResponse extends Response {
  results: IMovie[];
}

const getSearchMovies = async ({
  page,
  query
}: {
  page: number;
  query: string;
}): Promise<SearchMoviesResponse | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    const skeleton = $('.skeleton');
    skeleton?.remove();

    const errorUI = createDOMElement({
      tag: 'div',
      className: 'error-ui',
      children: [MessageDisplay({ text: '새로고침을 해주세요!' })]
    });

    $('.container')?.replaceChildren(errorUI);

    return null;
  }
};

export default getSearchMovies;
