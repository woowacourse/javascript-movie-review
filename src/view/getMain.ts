import fetchMovies from '../api/fetchFns';
import starFilledImage from '../assets/images/star_filled.png';
import globalStateMethod from '../globalState';
import { appendChildren } from '../utils/domUtil';
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

// eslint-disable-next-line max-lines-per-function
function getMovieItem(props: IMovieItemProps) {
  const movieItem = document.createElement('li');
  const movieItemLink = document.createElement('a');
  const movieItemCard = document.createElement('div');
  const movieItemImage = getImage(props);

  movieItemCard.classList.add('item-card');
  movieItemLink.appendChild(movieItemCard);
  appendChildren(movieItemCard, [
    movieItemImage,
    getTitleParagraph(props.title),
    getScoreParagraph(props.vote_average),
  ]);
  movieItem.appendChild(movieItemLink);

  return movieItem;
}

function checkPage(page: number, totalPages: number, button: HTMLElement | null) {
  if (page === totalPages) {
    button?.classList.add('hidden');
  }
}

async function getMovieItems(button = document.getElementById('see-more-button')) {
  const res: ITMDBResponse = await (
    await fetchMovies({
      url: globalStateMethod.getUrl(),
      page: globalStateMethod.getPage(),
      query: globalStateMethod.getQuery(),
    })
  ).json();

  checkPage(res.page, res.total_pages, button);

  const moviesData = res.results;
  // eslint-disable-next-line max-len
  const movieElements = moviesData.map((info: IMovieItemProps) => getMovieItem(info)) as HTMLElement[];
  return movieElements;
}

// eslint-disable-next-line max-lines-per-function
async function getMovieListContainer() {
  const movieListContainer = document.createElement('section');
  const popularTitle = document.createElement('h2');
  const movieList = document.createElement('ul');

  movieListContainer.classList.add('item-view');
  const query = globalStateMethod.getQuery();
  popularTitle.innerText = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
  movieList.classList.add('item-list');

  const button = getButton();
  const movieItems = await getMovieItems(button);
  appendChildren(movieList, movieItems);
  appendChildren(movieListContainer, [popularTitle, movieList]);
  movieListContainer.appendChild(button);

  return movieListContainer;
}

function getMovieListSkeletonUI(listTitle: string) {
  const section = document.createElement('section');
  section.classList.add('item-view');

  const title = document.createElement('h2');
  title.innerText = listTitle;

  const movieList = document.createElement('ul');
  movieList.classList.add('item-list');

  const movieItemCardSkeleton = `
              <li>
              <a href="#">
                <div class="item-card">
                  <div class="item-thumbnail skeleton"></div>
                  <div class="item-title skeleton"></div>
                  <div class="item-score skeleton"></div>
                </div>
              </a>
            </li>
            `;

  movieList.innerHTML = Array(20).fill(movieItemCardSkeleton).join('');
  appendChildren(section, [title, movieList]);
  return section;
}

async function replaceMain() {
  globalStateMethod.initializePage();
  const sectionTag = document.querySelector('section');
  const title = globalStateMethod.getQuery ? `"${globalStateMethod.getQuery()}" 검색 결과` : '지금 인기 있는 영화';
  const movieListSkeletonUI = getMovieListSkeletonUI(title);
  sectionTag?.replaceWith(movieListSkeletonUI);

  const movieListContainer = await getMovieListContainer();
  movieListSkeletonUI?.replaceWith(movieListContainer);
}

export default replaceMain;

export async function renderNewMovies() {
  globalStateMethod.increasePage();
  const movieList = document.querySelector('.item-list') as HTMLElement;
  const newMovies = await getMovieItems();
  appendChildren(movieList, newMovies);
}
