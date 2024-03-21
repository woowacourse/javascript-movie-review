import { renderNewMovies } from './getMain';

function getButton() {
  const button = document.createElement('button');
  button.id = 'see-more-button';
  button.className = 'btn primary';
  button.innerText = '더 보기';
  button.addEventListener('click', async () => {
    await renderNewMovies();
  });
  return button;
}

export default getButton;
