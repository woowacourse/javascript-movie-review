/* eslint-disable max-lines-per-function */
/* eslint-disable import/prefer-default-export */

import { closeSearchForm } from '../getHeader';

const changeSearchBoxHandler = (isMobile: boolean) => {
  if (window.innerWidth > 769 && isMobile) {
    closeSearchForm();
  }
};

export function addResizeEvent() {
  const isMobile = window.innerHeight <= 768;
  window.addEventListener('resize', () => changeSearchBoxHandler(isMobile));
}
