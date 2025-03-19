import { IMovie } from '../type';
import createDOMElement from '../util/createDomElement';
import Movie from './Movie';

function MovieList({ movies }: { movies: IMovie[] }) {
  return createDOMElement({
    tag: 'div',
    children: [
      createDOMElement({
        tag: 'h2',
        innerText: '지금 인기 있는 영화'
      }),
      createDOMElement({
        tag: 'ul',
        className: 'thumbnail-list',
        children: movies.map((movie) => Movie({ movie })) // 개별 영화 리스트 추가
      })
    ]
  });
}

export default MovieList;
