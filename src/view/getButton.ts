import { POPULAR_MOVIES_URL } from '../constants/tmdbConstants';
import { renderNewMovies } from './getMain';

function getButton() {
  const button = document.createElement('button');
  button.className = 'btn primary';
  button.innerText = '더 보기';
  button.addEventListener('click', async () => {
    await renderNewMovies(POPULAR_MOVIES_URL, { page: '1' });
  });
  return button;
}

export default getButton;
