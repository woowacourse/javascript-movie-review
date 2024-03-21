import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import ItemView from '../ItemView/ItemView';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();
    const searchBox = SearchBox.create();

    header.appendChild(logoImgContainer);
    header.appendChild(searchBox);

    document.getElementById('app')?.appendChild(header);
  },

  createLogoImgContainer() {
    const logoImgContainer = document.createElement('h1');
    const logoImg = document.createElement('img');

    logoImg.setAttribute('src', logo);
    logoImg.setAttribute('alt', 'MovieList 로고');

    logoImgContainer.appendChild(logoImg);
    logoImgContainer.addEventListener('click', () => this.showPopularMovies());
    return logoImgContainer;
  },

  showPopularMovies() {
    const itemView = document.querySelector('.item-view');
    itemView?.replaceChildren();

    new ItemView();
  },
};

export default MovieHeader;
