import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';

export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieProps {
  info: MovieInfo;
}

const Movie = assemble<MovieProps>((props) => {
  const {
    info: { poster_path, title, vote_average, id },
  } = props;
  const $events: Event[] = [];
  const $template = getElement(`
      <li data=id=${id}>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src=https://image.tmdb.org/t/p/w200/${poster_path}
              loading="lazy"
              alt=${title}
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="./star_filled.png" alt="별점" />${vote_average}</p>
          </div>
        </a>
    </li>
  `);

  return [$template, $events];
});

export { Movie };
