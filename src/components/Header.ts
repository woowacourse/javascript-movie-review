import Logo from '../imgs/logo.png';

const Header = {
  createElements() {
    const header = document.createElement('header');

    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    img.src = Logo;
    img.setAttribute('alt', 'MovieList 로고');

    h1.appendChild(img);
    header.appendChild(h1);
    return header;
  },
};

export default Header;
