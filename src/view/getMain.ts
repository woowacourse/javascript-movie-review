import fetchMovies from '../api/fetchMovies';
import starFilledImage from '../assets/images/star_filled.png';
import globalStateMethod from '../globalState';
import { appendChildren, elementsReplaceWith } from '../utils/domUtil';
import getButton from './getButton';

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
  appendChildren(movieItemCard, [image, title, score]);
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

function checkPage(responseJson: ITMDBResponse, button: HTMLElement | null) {
  if (responseJson.page === responseJson.total_pages) {
    button?.classList.add('hidden');
  }
}

async function getMovieItems(button = document.getElementById('see-more-button')) {
  const responseJson: ITMDBResponse = await fetchMovies();

  checkPage(responseJson, button);
  const moviesData = responseJson.results;
  const movieElements = moviesData.map((info: IMovieItemProps) => getMovieItem(info)) as HTMLElement[];
  return movieElements;
}

function getMainTitle() {
  const mainTitle = document.createElement('h2');
  const query = globalStateMethod.getQuery();
  mainTitle.innerText = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
  return mainTitle;
}

async function getMovieList(button?: HTMLButtonElement) {
  const movieList = document.createElement('ul');
  const movieItems = await getMovieItems(button);
  movieList.classList.add('item-list');
  appendChildren(movieList, movieItems);
  return movieList;
}

async function getMovieListContainer() {
  const movieListContainer = document.createElement('section');
  movieListContainer.classList.add('item-view');
  const mainTitle = getMainTitle();
  const button = getButton();
  const movieList = await getMovieList(button);
  appendChildren(movieListContainer, [mainTitle, movieList, button]);
  return movieListContainer;
}

function getMovieItemCardSkeleton() {
  const list = document.createElement('li');
  list.innerHTML = `<a href="#">
  <div class="item-card">
    <div class="item-thumbnail skeleton"></div>
    <div class="item-title skeleton"></div>
    <div class="item-score skeleton"></div>
  </div>`;
  return list;
}

function getSkeletonMovieList() {
  const movieList = document.createElement('ul');
  movieList.classList.add('item-list');
  const skeletonItems = Array.from({ length: 20 }, () => getMovieItemCardSkeleton());
  appendChildren(movieList, skeletonItems);
  return movieList;
}

function getSkeletonView() {
  const section = document.createElement('section');
  section.classList.add('item-view');
  const title = document.createElement('h2');
  title.innerText = globalStateMethod.getQuery ? `"${globalStateMethod.getQuery()}" 검색 결과` : '지금 인기 있는 영화';
  const movieList = getSkeletonMovieList();
  appendChildren(section, [title, movieList]);
  return section;
}

async function replaceMain() {
  globalStateMethod.initializePage();
  const sectionTag = document.querySelector('section');
  const skeletonView = getSkeletonView();
  sectionTag?.replaceWith(skeletonView);
  const movieListContainer = await getMovieListContainer();
  skeletonView?.replaceWith(movieListContainer);
}

export default replaceMain;

export async function renderNewMovies() {
  globalStateMethod.increasePage();
  const movieList = document.querySelector('.item-list') as HTMLElement;
  const skeletonItems = Array.from({ length: 20 }, () => getMovieItemCardSkeleton());
  appendChildren(movieList, skeletonItems);
  const newMovies = await getMovieItems();
  elementsReplaceWith(skeletonItems, newMovies);
}
