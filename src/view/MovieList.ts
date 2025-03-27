import createDOMElement from '../util/createDomElement';
import MessageDisplay from '../component/MessageDisplay';
import Movie from '../component/Movie';
import { MoveType } from '../type';
import { $ } from '../util/selector';

const handleMovieItemClick = async () => {
  const modal = $('#modal') as HTMLDialogElement;
  modal?.showModal();

  modal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) modal?.close();
  });

  $('#closeModal')?.addEventListener('click', (e) => {
    modal?.close();
  });
};

function MovieList({ title, movies }: { title: string; movies: MoveType[] }) {
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
            children: movies.map((movie) => Movie({ movie, onClick: handleMovieItemClick }))
          })
        : MessageDisplay({ text: '검색 결과가 없습니다.' })
    ]
  });
}

export default MovieList;
