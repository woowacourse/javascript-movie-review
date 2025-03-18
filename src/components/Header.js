import TopRatedContainer from './TopRatedContainer';
import createElement from './utils/createElement';

const Header = () => {
  const $header = createElement({
    tag: 'header',
  });

  const $backgroundContainer = createElement({
    tag: 'div',
    classNames: ['background-container'],
  });

  const $overlay = createElement({
    tag: 'div',
    classNames: ['overlay'],
    'aria-hidden': 'true',
  });

  $header.append($backgroundContainer);
  $backgroundContainer.append($overlay);
  $backgroundContainer.append(TopRatedContainer());

  return $header;
};

export default Header;
