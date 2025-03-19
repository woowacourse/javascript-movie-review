import TopRatedContainer from './TopRatedContainer';
import createElement from './utils/createElement';

const Header = ({popularMovie}) => {
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

  $header.appendChild($backgroundContainer);
  $backgroundContainer.appendChild($overlay);
  $backgroundContainer.appendChild(TopRatedContainer({popularMovie}));

  return $header;
};

export default Header;
