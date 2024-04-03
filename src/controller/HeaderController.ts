import { MOBILE_BREAKPOINT } from '../constants/rule';

const HeaderController = {
  toggleSearchInputVisibilityOnSmallScreens() {
    const $searchInput = document.querySelector(
      '.search-input',
    ) as HTMLInputElement;
    const $searchBtn = document.querySelector(
      '.search-button',
    ) as HTMLButtonElement;
    const $searchBox = document.querySelector('.search-box') as HTMLElement;

    $searchInput.classList.add('visibility-hidden');
    $searchBtn.addEventListener('click', () => {
      $searchBox.classList.toggle('click-input-box');
      $searchInput.classList.toggle('visibility-hidden');
    });
  },

  resizeObserver() {
    const $app = document.getElementById('app') as HTMLElement;
    const callback = (entries: ResizeObserverEntry[]) => {
      const observerWidth = entries[0].contentRect.width;
      if (observerWidth <= MOBILE_BREAKPOINT) {
        this.toggleSearchInputVisibilityOnSmallScreens();
      }
    };

    const observer = new ResizeObserver(callback);
    observer.observe($app);
  },
};
export default HeaderController;
