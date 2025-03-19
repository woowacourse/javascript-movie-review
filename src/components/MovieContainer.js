import MovieList from './MovieList';
import createElement from './utils/createElement';
import Button from './Button';
import BUTTON from '../constants/constant';

const MovieContainer = ({ movies }) => {
  const $container = createElement({
    tag: 'div',
    classNames: ['container'],
  });

  const $main = createElement({
    tag: 'main',
  });

  const $section = createElement({
    tag: 'section',
  });

  const $h2 = createElement({
    tag: 'h2',
    classNames:['list-title']
  });

  $h2.textContent = '지금 인기 있는 영화';

  $container.appendChild($main);
  $main.appendChild($section);
  $section.appendChild($h2);
  $section.appendChild(MovieList({ movies }));

  $main.appendChild(Button({ text: BUTTON.MORE, type: 'more'}));

  return $container;
};

export default MovieContainer;
