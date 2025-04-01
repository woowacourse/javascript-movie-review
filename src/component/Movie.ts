import createDOMElement from '../util/createDomElement';
import { DEFAULT_IMAGE_URL, IMAGE_BASE_URL } from '../constant';
import { MovieType } from '../type';
import { handleMovieDetail } from '../view/events/handleMovieDetail';

function Movie({ movie }: { movie: MovieType }) {
  const posterPath = movie.posterPath ? IMAGE_BASE_URL + '/w440_and_h660_face/' + movie.posterPath : DEFAULT_IMAGE_URL;

  return createDOMElement({
    tag: 'li',
    className: 'item',
    attributes: { tabIndex: '0', role: 'button' },
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
        handleMovieDetail(movie.id);
      },
      keydown: (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.code === 'Enter') {
          handleMovieDetail(movie.id);
        }
      }
    }
  });
}

export default Movie;
