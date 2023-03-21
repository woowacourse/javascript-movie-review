import { MovieInfo, MovieInfoByKeyword } from '../../apis';
import { assemble, Event, useEffect, useState } from '../../core';
import { getElement } from './../../utils/common/domHelper';

export interface MovieProps {
  info: MovieInfo | MovieInfoByKeyword;
}

const Movie = assemble<MovieProps>((props) => {
  const {
    info: { poster_path, title, vote_average, id },
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w200/${poster_path}`;
    img.onload = () => setIsLoading(false);
  }, []);

  const $events: Event[] = [];
  const $template = getElement(`
      <li class="item--movie" data=id=${id}>
        <a href="#">
          <div class="item-card movie">
            ${
              isLoading
                ? `<div class="item-thumbnail skeleton"></div>`
                : `<img
                    class="item-thumbnail"
                    src=https://image.tmdb.org/t/p/w200/${poster_path}
                    loading="lazy"
                    alt=${title} />`
            }
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="./star_filled.png" alt="별점" />${vote_average}</p>
          </div>
        </a>
    </li>
  `);

  return [$template, $events];
});

export { Movie };
