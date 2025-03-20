import createDOMElement from '../util/createDomElement';
import SearchBar from './SearchBar';

function Header() {
  return createDOMElement({
    tag: 'div',
    className: 'logo',
    children: [
      createDOMElement({
        tag: 'a',
        attributes: {
          href: '/'
        },
        children: [
          createDOMElement({
            tag: 'img',
            className: 'logo-img',
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
