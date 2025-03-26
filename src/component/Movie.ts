import createDOMElement from '../util/createDomElement';
import { DEFAULT_IMAGE_URL, IMAGE_BASE_URL } from '../constant';
import { IMovie } from '../type';

function Movie({ movie }: { movie: IMovie }) {
  const poster_path = movie.poster_path
    ? IMAGE_BASE_URL + '/w440_and_h660_face/' + movie.poster_path
    : DEFAULT_IMAGE_URL;

  return createDOMElement({
    tag: 'li',
    className: 'item',
    children: [
      createDOMElement({
        tag: 'img',
        className: 'thumbnail',
        attributes: {
          src: poster_path,
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
                textContent: movie.vote_average.toFixed(1)
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
