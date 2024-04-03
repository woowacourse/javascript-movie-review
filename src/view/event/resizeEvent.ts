/* eslint-disable max-lines-per-function */
/* eslint-disable import/prefer-default-export */

const changeSearchBoxHandler = (isMobile: boolean) => {
  if (window.innerWidth > 769 && isMobile) {
    const button = document.querySelector('.mobile-search-button') as HTMLButtonElement;
    const searchBox = document.querySelector('.search-box') as HTMLFormElement;

    button.classList.add('mobile-visibility-visible');
    button.classList.remove('mobile-visibility-hidden');

    searchBox.classList.add('mobile-visibility-hidden');
    searchBox.classList.remove('mobile-visibility-visible');
  }
};

export function addResizeEvent() {
  const isMobile = window.innerHeight <= 768;
  window.addEventListener('resize', () => changeSearchBoxHandler(isMobile));
}
