import { renderNewMovies } from '../main';

let isLoading = false;

const scrollEventHandler = async () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 200 && !isLoading) {
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
