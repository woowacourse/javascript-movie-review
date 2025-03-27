import createDOMElement from '../util/createDomElement';
import Button from '../component/Button';
import { IMAGE_BASE_URL } from '../constant';
import { MoveType } from '../type';

function Banner({ movie }: { movie: MoveType }) {
  const { backdrop_path, vote_average, title } = movie;
  return createDOMElement({
    tag: 'header',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'background-container',
        children: [BackDrop({ backDropUrl: backdrop_path }), TopRatedMovie({ vote_average, title })]
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
        tag: 'img',
        attributes: { src: `${IMAGE_BASE_URL}/w1920/${backDropUrl}` }
      })
    ]
  });
}

function TopRatedMovie({ vote_average, title }: { vote_average: number; title: string }) {
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
                textContent: vote_average.toFixed(1)
              })
            ]
          }),
          createDOMElement({
            tag: 'div',
            className: 'title',
            textContent: title
          }),
          Button({ text: '자세히보기', id: 'bannerMovieButton' })
        ]
      })
    ]
  });
}

export default Banner;
