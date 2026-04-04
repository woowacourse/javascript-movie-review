import { MovieData } from '../api/type.ts';
import { Rate } from './Rate.ts';

const template = `
  <div class="background-container">
    <div class="overlay" aria-hidden="true">
    </div>
    <div class="top-rated-container">
      <h1 class="logo">
        <img src="./images/logo.png" alt="MovieList" />
      </h1>
      <div class="top-rated-movie">
        <div class="title"></div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
`;

export const Header = (data: MovieData) => {
  const { poster_path, title, vote_average } = data;
  const $header = document.createElement('header');
  $header.insertAdjacentHTML('beforeend', template);

  const $overlay = $header.querySelector<HTMLImageElement>('.overlay');
  const $overlayImg = document.createElement('img');
  $overlayImg.src = poster_path;
  $overlayImg.alt = title;
  $overlay?.append();

  const $topRateMovie = $header.querySelector<HTMLImageElement>('.top-rated-movie');
  if (!$topRateMovie) {
    throw new Error('.rate가 없어요');
  }
  $topRateMovie.append(Rate({ rateValue: vote_average }));

  const $title = $topRateMovie.querySelector<HTMLImageElement>('.title');
  if (!$title) {
    throw new Error('타이틀태그가 없음');
  }
  $title.textContent = title;

  return $header;
};
