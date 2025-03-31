import createDOMElement from '../util/createDomElement';
import Button from '../component/Button';
import { IMAGE_BASE_URL } from '../constant';
import { MoveType } from '../type';
import { handleMovieDetail } from './events/handleMovieDetail';

function Banner({ movie }: { movie: MoveType }) {
  const { backdropPath, voteAverage, title, id } = movie;
  return createDOMElement({
    tag: 'header',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'background-container',
        children: [BackDrop({ backDropUrl: backdropPath }), TopRatedMovie({ voteAverage, title, id })]
      })
    ]
  });
}

function BackDrop({ backDropUrl }: { backDropUrl: string | null }) {
  return createDOMElement({
    tag: 'div',
    className: 'overlay',
    attributes: { 'aria-hidden': 'true' },
    children: [
      createDOMElement({
        tag: 'div',
        className: 'overlay'
      }),
      createDOMElement({
        tag: 'img',
        attributes: { src: `${IMAGE_BASE_URL}/w1920/${backDropUrl}` }
      })
    ]
  });
}

function TopRatedMovie({ voteAverage, title, id }: { voteAverage: number; title: string; id: number }) {
  return createDOMElement({
    tag: 'div',
    className: 'top-rated-container',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'top-rated-movie',
        children: [
          createDOMElement({
            tag: 'div',
            className: 'rate',
            children: [
              createDOMElement({
                tag: 'img',
                className: 'star',
                attributes: { src: 'images/star_empty.png' }
              }),
              createDOMElement({
                tag: 'span',
                className: 'rate-value',
                textContent: voteAverage.toFixed(1)
              })
            ]
          }),
          createDOMElement({
            tag: 'div',
            className: 'title',
            textContent: title
          }),
          Button({
            text: '자세히보기',
            id: 'bannerMovieButton',
            className: 'primary',
            onClick: () => handleMovieDetail(id)
          })
        ]
      })
    ]
  });
}

export default Banner;
