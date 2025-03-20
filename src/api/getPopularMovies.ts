import MessageDisplay from '../component/MessageDisplay';
import { IMovie } from '../type';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import { BASE_URL } from './constant';
import { Response } from './type';

interface PopularMoviesResponse extends Response {
  results: IMovie[];
}

const getPopularMovies = async ({ page }: { page: number }): Promise<PopularMoviesResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=${page}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    const skeleton = $('.skeleton');
    skeleton?.remove();

    const errorUI = createDOMElement({
      tag: 'div',
      className: 'error-ui',
      children: [MessageDisplay({ text: '서버 에러남' })]
    });

    $('.container')?.replaceChildren(errorUI);
    return null;
  }
};

export default getPopularMovies;
