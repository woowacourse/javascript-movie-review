import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';

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

    return logoImgContainer;
  },

  // TODO: eventListener 다는 함수 추가
};

export default MovieHeader;

// <header>
// <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
// <div class="search-box">
//   <input type="text" placeholder="검색" />
//   <button class="search-button">검색</button>
// </div>
// </header>
