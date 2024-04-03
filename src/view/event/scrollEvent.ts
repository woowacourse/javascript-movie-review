import { renderNewMovies } from '../main';

let isLoading = false;
const OBSERVE_HEIGHT = 200;

const scrollEventHandler = async () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - OBSERVE_HEIGHT && !isLoading) {
    isLoading = true;
    await renderNewMovies();
    isLoading = false;
  }
};

export function addScrollEvent() {
  window.addEventListener('scroll', scrollEventHandler);
}

export function removeScrollEvent() {
  window.removeEventListener('scroll', scrollEventHandler);
}
