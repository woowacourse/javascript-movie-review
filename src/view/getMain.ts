import starFilledImage from '../assets/images/star_filled.png';
import { POPULAR_MOVIES_URL } from '../constants/tmdbConstants';
import { appendChildren } from '../utils/domUtil';
import getButton from './getButton';

interface IMovieItemProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

function getImage(props: IMovieItemProps) {
  const img = document.createElement('img');
  img.alt = props.title;
  img.src = `https://image.tmdb.org/t/p/w500/${props.poster_path}`;
  img.loading = 'lazy';
  return img;
}

function getTitleParagraph(title: string) {
  const movieTitle = document.createElement('p');
  movieTitle.classList.add('item-title');
  movieTitle.innerText = title;
  return movieTitle;
}

function getScoreParagraph(score: number) {
  const movieScore = document.createElement('p');
  const starScore = document.createElement('img');
  movieScore.classList.add('item-score');
  movieScore.innerText = String(score);
  starScore.src = starFilledImage;
  movieScore.appendChild(starScore);
  return movieScore;
}

// eslint-disable-next-line max-lines-per-function
function getMovieItem(props: IMovieItemProps) {
  const movieItem = document.createElement('li');
  const movieItemLink = document.createElement('a');
  const movieItemCard = document.createElement('div');
  const movieItemImage = getImage(props);

  movieItemCard.classList.add('item-card');
  movieItemLink.appendChild(movieItemCard);
  // eslint-disable-next-line max-len
  appendChildren(movieItemCard, [
    movieItemImage,
    getTitleParagraph(props.title),
    getScoreParagraph(props.vote_average),
  ]);
  movieItem.appendChild(movieItemLink);

  return movieItem;
}

// eslint-disable-next-line max-lines-per-function
async function getMovieListContainer(listTitle: string) {
  const movieListContainer = document.createElement('section');
  const popularTitle = document.createElement('h2');
  const movieList = document.createElement('ul');

  movieListContainer.classList.add('item-view');
  popularTitle.innerText = listTitle;
  movieList.classList.add('item-list');

  const res = await (
    await fetch(
      `${POPULAR_MOVIES_URL}?${new URLSearchParams({
        api_key: process.env.TMDB_API_KEY,
        language: 'ko-KR',
        page: '1',
      })}`,
    )
  ).json();

  const moviesData = res.results;
  // eslint-disable-next-line max-len
  const movieElements = moviesData.map((info: IMovieItemProps) => getMovieItem(info)) as HTMLElement[];

  appendChildren(movieList, movieElements);

  appendChildren(movieListContainer, [popularTitle, movieList]);
  movieListContainer.appendChild(getButton());

  return movieListContainer;
}

async function getMain() {
  const mainTag = document.createElement('main');
  const movieListContainer = await getMovieListContainer('지금 인기 있는 영화');

  mainTag.appendChild(movieListContainer);

  return mainTag;
}

export default getMain;
