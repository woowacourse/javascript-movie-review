import createDOMElement from '../util/createDomElement';
import getMovieDetail from '../api/getMovieDetail';
import { DEFAULT_IMAGE_URL, IMAGE_BASE_URL } from '../constant';
import { MoveType } from '../type';
import { $ } from '../util/selector';
import { updateModalData } from '../view/render/renderModal';

function Movie({ movie }: { movie: MoveType }) {
  const posterPath = movie.posterPath ? IMAGE_BASE_URL + '/w440_and_h660_face/' + movie.posterPath : DEFAULT_IMAGE_URL;

  return createDOMElement({
    tag: 'li',
    className: 'item',
    children: [
      createDOMElement({
        tag: 'img',
        className: 'thumbnail',
        attributes: {
          src: posterPath,
          alt: movie.title
        }
      }),
      createDOMElement({
        tag: 'div',
        className: 'item-desc',
        children: [
          createDOMElement({
            tag: 'p',
            className: 'rate',
            children: [
              createDOMElement({
                tag: 'img',
                className: 'star',
                attributes: { src: 'images/star_empty.png' }
              }),
              createDOMElement({
                tag: 'span',
                textContent: movie.voteAverage.toFixed(1)
              })
            ]
          }),
          createDOMElement({
            tag: 'strong',
            textContent: movie.title
          })
        ]
      })
    ],
    event: {
      click: () => {
        handleMovieItemClick(movie.id);
      }
    }
  });
}

const handleMovieItemClick = async (id: number) => {
  const idInput = $('#movieId') as HTMLInputElement;
  idInput.value = id.toString();

  const modal = $('#modal') as HTMLDialogElement;
  modal?.showModal();
  const params = {
    language: 'ko-KR'
  };
  const movieDetail = await getMovieDetail(params, id);
  if (movieDetail) {
    updateModalData(movieDetail);
  }
};

export default Movie;
