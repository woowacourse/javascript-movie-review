import { IMovie } from '../type';
import createDOMElement from '../util/createDomElement';
import MessageDisplay from './MessageDisplay';
import Movie from './Movie';

function MovieList({ title, movies }: { title: string; movies: IMovie[] }) {
  return createDOMElement({
    tag: 'div',
    children: [
      createDOMElement({
        tag: 'h2',
        textContent: title
      }),

      movies.length !== 0
        ? createDOMElement({
            tag: 'ul',
            className: 'thumbnail-list',
            children: movies.map((movie) => Movie({ movie }))
          })
        : MessageDisplay({ text: '검색 결과가 없습니다.' })
    ]
  });
}
export default MovieList;
