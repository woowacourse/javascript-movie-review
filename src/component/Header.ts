import { IMovie } from '../type';
import createDOMElement from '../util/createDomElement';
import Button from './Button';
import SearchBar from './SearchBar';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1920';

function Header({ movie }: { movie: IMovie }) {
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
        attributes: { src: `${IMAGE_BASE_URL}${backDropUrl}` }
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
        className: 'logo',
        children: [
          createDOMElement({
            tag: 'img',
            className: 'logo-img',
            attributes: {
              src: 'images/logo.png',
              alt: 'MovieList'
            }
          }),
          SearchBar()
        ]
      }),
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
                innerText: vote_average.toFixed(1)
              })
            ]
          }),
          createDOMElement({
            tag: 'div',
            className: 'title',
            innerText: title
          }),
          Button({ text: '자세히보기' })
        ]
      })
    ]
  });
}

export default Header;
