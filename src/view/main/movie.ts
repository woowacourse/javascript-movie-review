/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import fetchMovies from '../../api/fetchMovies';
import starFilledImage from '../../assets/images/star_filled.png';
import movieStateMethod from '../../store/movieStore';
import renderMovieDetailModal from '../movieDetailModal';
import { removeScrollEvent } from '../scrollEvent';

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
  img.classList.add('item-thumbnail');
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
  const movieItemButton = document.createElement('button');
  const movieItemCard = getMovieItemCard(props);
  movieItemButton.classList.add('movie-detail-button');
  movieItemButton.onclick = () => renderMovieDetailModal(props.id);
  movieItemButton.appendChild(movieItemCard);
  movieItem.appendChild(movieItemButton);
  return movieItem;
}

function checkPage({ page, totalPage }: { page: number; totalPage: number }) {
  if (page === totalPage) {
    removeScrollEvent();
  }
}

const handleGetMovieItemsError = (error: Error) => {
  alert(error.message);
  location.reload();
};

export async function getMovieItems() {
  const {
    results,
    page,
    total_pages: totalPage,
  }: ITMDBResponse = await fetchMovies().catch((error: Error) => handleGetMovieItemsError(error));
  const movieElements = results.map((info: IMovieItemProps) => getMovieItem(info)) as HTMLElement[];
  return { elements: movieElements, page, totalPage };
}

function getMainTitle() {
  const mainTitle = document.createElement('h2');
  const query = movieStateMethod.getQuery();
  mainTitle.innerText = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
  return mainTitle;
}

async function getMovieList() {
  const movieList = document.createElement('ul');
  const { elements: movieItems, page, totalPage } = await getMovieItems();
  checkPage({ page, totalPage });
  movieList.classList.add('item-list');
  movieList.append(...movieItems);
  return movieList;
}

export async function getMovieListContainer() {
  const movieListContainer = document.createElement('section');
  movieListContainer.classList.add('item-view');
  const mainTitle = getMainTitle();
  const movieList = await getMovieList();
  movieListContainer.append(mainTitle, movieList);
  return movieListContainer;
}
