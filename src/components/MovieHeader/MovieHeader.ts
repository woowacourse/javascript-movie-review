import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import Button from '../Button/Button';
import { BUTTONS } from '../../constants/INFORMATION';

const MovieHeader = {
  create(logoImgOnclick: () => void, searchBoxOnClick: () => void) {
    const header = document.createElement('header');

    const logoImgContainer = this.createLogoImgContainer(logoImgOnclick);
    const searchCloseButton = Button.create(BUTTONS.searchClose, () => header.classList.remove('clicked'));
    const searchBox = SearchBox.create(header, searchBoxOnClick);

    header.appendChild(logoImgContainer);
    header.appendChild(searchCloseButton);
    header.appendChild(searchBox);

    return header;
  },

  createLogoImgContainer(logoImgOnclick: () => void) {
    const logoImgContainer = document.createElement('h1');
    const logoImg = document.createElement('img');

    logoImg.src = logo;
    logoImg.alt = 'MovieList 로고';

    logoImgContainer.appendChild(logoImg);
    logoImgContainer.addEventListener('click', logoImgOnclick);

    return logoImgContainer;
  },
};

export default MovieHeader;
