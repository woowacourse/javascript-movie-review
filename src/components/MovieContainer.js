import MovieList from './MovieList';
import createElement from './utils/createElement';
import Button from './Button';
import BUTTON from '../constants/constant';

const MovieContainer = () => {
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
  });

  $h2.textContent = '지금 인기 있는 영화';

  $container.appendChild($main);
  $main.appendChild($section);
  $section.appendChild($h2);
  $section.appendChild(MovieList());
  $main.appendChild(Button({ text: BUTTON.MORE }));

  return $container;
};

export default MovieContainer;
