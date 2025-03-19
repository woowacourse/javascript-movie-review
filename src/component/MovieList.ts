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
        attributes: { 'data-page': '1' },
        children: movies.map((movie) => Movie({ movie }))
      })
    ]
  });
}

export default MovieList;
