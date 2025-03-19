import { IMovie } from '../type';
import createDOMElement from '../util/createDomElement';
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
        : NoResult()
    ]
  });
}

function NoResult() {
  return createDOMElement({
    tag: 'div',
    className: 'no-result',
    children: [
      createDOMElement({
        tag: 'img',
        attributes: {
          src: 'images/으아아행성이.svg'
        }
      }),
      createDOMElement({
        tag: 'p',
        textContent: '검색 결과가 없습니다.'
      })
    ]
  });
}

export default MovieList;
