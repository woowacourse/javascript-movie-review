import MovieItem from './MovieItem';

const MovieContainer = () => {
  const section = document.createElement('section');

  const h2 = document.createElement('h2');
  const movieList = document.createElement('ul');
  const button = document.createElement('button');

  movieList.classList.add('item-list');
  button.classList.add('btn', 'primary', 'full-width');

  button.textContent = '더 보기';
  h2.textContent = '지금 인기 있는 영화';

  section.appendChild(h2);
  section.appendChild(movieList);
  section.appendChild(button);

  movieList.appendChild(MovieItem());

  return section;
};

export default MovieContainer;
