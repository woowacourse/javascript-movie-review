import createDOMElement from '../util/createDomElement';
import SearchBar from '../view/SearchBar';

function Header() {
  return createDOMElement({
    tag: 'div',
    className: 'logo',
    children: [
      createDOMElement({
        tag: 'a',
        className: 'logo-img',
        attributes: {
          href: '/javascript-movie-review'
        },
        children: [
          createDOMElement({
            tag: 'img',
            attributes: {
              src: 'images/logo.png',
              alt: 'MovieList'
            }
          })
        ]
      }),

      SearchBar()
    ]
  });
}

export default Header;
