/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import fetchMovies from '../../api/fetchMovies';

import starFilledImage from '../../assets/images/star_filled.png';
import getSeeMoreButton from '../getSeeMoreButton';
import movieStateMethod from '../../store/movieStore';

interface IMovieItemProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

interface ITMDBResponse {
  page: number;
  total_pages: number;
  results: IMovieItemProps[];
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
  movieScore.innerText = String(score.toFixed(1));
  starScore.src = starFilledImage;
  movieScore.appendChild(starScore);
  return movieScore;
}

function getMovieItemCard(props: IMovieItemProps) {
  const movieItemCard = document.createElement('div');
  movieItemCard.classList.add('item-card');

  const image = getImage(props);
  const title = getTitleParagraph(props.title);
  const score = getScoreParagraph(props.vote_average);
  movieItemCard.append(image, title, score);
  return movieItemCard;
}

function getMovieItem(props: IMovieItemProps) {
  const movieItem = document.createElement('li');
  const movieItemLink = document.createElement('a');
  const movieItemCard = getMovieItemCard(props);

  movieItemLink.appendChild(movieItemCard);
  movieItem.appendChild(movieItemLink);
  return movieItem;
}

function checkPage(
  { page, totalPage }: { page: number; totalPage: number },
  button = document.getElementById('see-more-button'),
) {
  if (page === totalPage) {
    button?.classList.add('hidden');
  }
}

export async function getMovieItems() {
  // eslint-disable-next-line camelcase
  const { results, page, total_pages }: ITMDBResponse = await fetchMovies().catch((error) => {
    alert(error.message);
    location.reload();
  });
  const movieElements = results.map((info: IMovieItemProps) => getMovieItem(info)) as HTMLElement[];
  // eslint-disable-next-line camelcase
  return { elements: movieElements, page, totalPage: total_pages };
}

function getMainTitle() {
  const mainTitle = document.createElement('h2');
  const query = movieStateMethod.getQuery();
  mainTitle.innerText = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
  return mainTitle;
}

async function getMovieList(button?: HTMLButtonElement) {
  const movieList = document.createElement('ul');
  const { elements: movieItems, page, totalPage } = await getMovieItems();
  checkPage({ page, totalPage }, button);
  movieList.classList.add('item-list');
  movieList.append(...movieItems);
  return movieList;
}

export async function getMovieListContainer() {
  const movieListContainer = document.createElement('section');
  movieListContainer.classList.add('item-view');
  const mainTitle = getMainTitle();
  const button = getSeeMoreButton();
  const movieList = await getMovieList(button);
  movieListContainer.append(mainTitle, movieList, button);
  return movieListContainer;
}
