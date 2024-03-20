import logoImg from '../assets/images/logo.png';
import starImg from '../assets/images/star_empty.png';
import { appendChildren } from '../utils/domUtil';
import getButton from './getButton';

interface IMovieItemProps {
  image: string;
  title: string;
  score: number;
}

// function getImage(props: Omit<IMovieItemProps, 'score'>) {
function getImage(props: IMovieItemProps) {
  const img = document.createElement('img');
  img.src = props.image;
  img.alt = props.title;
  return img;
}

function getTitleParagraph(title: string) {
  const paragraph = document.createElement('p');
  paragraph.classList.add('item-title');
  paragraph.textContent = title;
}

function getScoreParagraph() {
  const paragraph = document.createElement('p');
  const image = document.createElement('img');
}

function getMovieItem(props: IMovieItemProps) {
  const movieItem = document.createElement('li');
  const movieItemLink = document.createElement('a');
  const movieItemCard = document.createElement('div');
  const movieItemImage = getImage(props);
  const movieTitle = document.createElement('p');
  const movieScore = document.createElement('p');

  movieItemCard.classList.add('item-card');

  movieItemImage.src = 'https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg';

  movieItemLink.appendChild(movieItemCard);
  appendChildren(movieItemCard, [movieItemImage, movieTitle, movieScore]);
  movieItem.appendChild(movieItemLink);

  return movieItem;
}

function getMovieListContainer(listTitle: string) {
  const movieListContainer = document.createElement('section');
  const popularTitle = document.createElement('h2');
  const movieList = document.createElement('ul');

  movieListContainer.classList.add('item-view');
  popularTitle.innerText = listTitle;
  movieList.classList.add('item-list');

  // TODO: fetch로 리팩토링
  const movies = Array.from({ length: 20 }, getMovieItem) as HTMLElement[];
  movies.forEach((movieItem) => {
    movieList.append(movieItem);
  });

  appendChildren(movieListContainer, [popularTitle, movieList]);

  return movieListContainer;
}

function getMain() {
  const mainTag = document.createElement('main');
  const movieListContainer = getMovieListContainer('지금 인기 있는 영화');

  mainTag.appendChild(movieListContainer);

  return mainTag;
}

export default getMain;
