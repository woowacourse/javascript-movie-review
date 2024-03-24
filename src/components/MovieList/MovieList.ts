const MovieList = () => {
  const section = document.createElement('section');

  const subtitle = document.createElement('h2');
  const movieList = document.createElement('ul');
  const button = document.createElement('button');

  subtitle.classList.add('subtitle');
  section.classList.add('item-view');
  movieList.classList.add('item-list');
  button.classList.add('view-more-button', 'primary', 'full-width');

  button.textContent = '더 보기';

  section.appendChild(subtitle);
  section.appendChild(movieList);
  section.appendChild(button);

  return section;
};

export default MovieList;
