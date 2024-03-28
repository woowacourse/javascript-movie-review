import SkeletonItems from '../SkeletonItems/SkeletonItems';

interface Props {
  onMovieClick: (event: MouseEvent) => void;
}

const MovieListSection = ({ onMovieClick }: Props) => {
  const section = document.createElement('section');

  const subtitle = document.createElement('h2');
  const errorContainer = document.createElement('div');
  const movieList = document.createElement('ul');

  subtitle.classList.add('subtitle');
  section.classList.add('item-view');
  errorContainer.classList.add('error-container', 'hidden');
  movieList.classList.add('item-list');

  section.appendChild(subtitle);
  section.appendChild(errorContainer);
  section.appendChild(movieList);
  section.appendChild(SkeletonItems());

  movieList.addEventListener('click', async (event) => onMovieClick(event));

  return section;
};

export default MovieListSection;
