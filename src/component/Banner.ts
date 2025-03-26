import createDOMElement from '../util/createDomElement';
import Button from './Button';
import { IMAGE_BASE_URL } from '../constant';
import { IMovie } from '../type';
import { $ } from '../util/selector';

function Banner({ movie }: { movie: IMovie }) {
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
          Button({ text: '자세히보기', id: 'datail' })
        ]
      })
    ]
  });
}

export default Banner;

export const removeBanner = () => {
  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.style.padding = '100px 0 64px';
};

export const addBanner = (banner: HTMLElement) => {
  const wrap = $('#wrap');
  wrap?.prepend(banner);
};
