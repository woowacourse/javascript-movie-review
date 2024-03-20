import logoImg from '../assets/images/logo.png';
import starImg from '../assets/images/star_empty.png';
import { appendChildren } from '../utils/domUtil';
import getButton from './getButton';

function getDummyItem() {
  const movieItem = document.createElement('li');
  movieItem.innerHTML = '잘되나?';
  return movieItem;
  // return `
  //           <li>
  //             <a href="#">
  //               <div class="item-card">
  //                 <img
  //                   class="item-thumbnail"
  //                   src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
  //                   loading="lazy"
  //                   alt="앤트맨과 와스프: 퀀텀매니아"
  //                 />
  //                 <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
  //                 <p class="item-score"><img src=${starImg} alt="별점" />6.5</p>
  //               </div>
  //             </a>
  //           </li>
  // `;
}

function getMovieListContainer(listTitle: string) {
  const movieListContainer = document.createElement('section');
  const popularTitle = document.createElement('h2');
  const movieList = document.createElement('ul');

  movieListContainer.classList.add('item-view');
  popularTitle.innerText = listTitle;
  movieList.classList.add('item-list');

  const movies = Array.from({ length: 20 }, getDummyItem) as HTMLElement[];
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
