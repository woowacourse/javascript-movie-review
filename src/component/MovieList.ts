import createDOMElement from '../util/createDomElement';
import MessageDisplay from './MessageDisplay';
import Movie from './Movie';
import { IMovie } from '../type';
import { $ } from '../util/selector';

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

export const addMoreMovieList = (newMovies: IMovie[]) => {
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;
  const fragment = document.createDocumentFragment();

  newMovies.forEach((movie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};

export const addMovieList = ({ movies, title }: { movies: IMovie[]; title: string }) => {
  const container = $('.container');
  if (!container) return;

  const movieList = MovieList({ movies, title });

  container.appendChild(movieList);
};
