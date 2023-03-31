import { searchButtonImage } from '../../assets/images';
import { $ } from '../../utils/dom';

const MobileSearchBox = {
  template() {
    return `
      <div class="mobile-search-box">
        <button type="button" class="search-button">
          <img src=${searchButtonImage} alt="영화 검색" />
        </button>
      </div>
    `;
  },

  setEvent() {
    const searchBox = $<HTMLDivElement>('.search-box');
    const mobileSearchBox = $<HTMLDivElement>('.mobile-search-box');
    const mobileSearchButton = $<HTMLButtonElement>('.search-button[type="button"]');

    mobileSearchButton.addEventListener('click', () => {
      searchBox.style.display = 'block';
      mobileSearchBox.style.display = 'none';
    });
  },
};

export default MobileSearchBox;
