import createDOMElement from '../util/createDomElement';
import { DEFAULT_IMAGE_URL, IMAGE_BASE_URL } from '../constant';
import { MoveType } from '../type';

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
    ]
  });
}

export default Movie;
