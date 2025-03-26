import { fetchDetailMovie } from "../../api/fetchDetailMovie.ts";
import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import Rate from "../common/Rate.ts";
import MovieDetailContent from "./MovieDetail.ts";

type Props = {
  id: number;
  src: string;
  rate: number;
  title: string;
};

const MovieItem = ({ id, src, rate, title }: Props) => {
  async function onClick() {
    const movie = await fetchDetailMovie(id);
    const { title, genres, vote_average, poster_path, overview, release_date } =
      movie.data;

    $("#modalBackground").classList.add("active");

    $(".modal").appendChild(
      MovieDetailContent({
        title,
        genres,
        vote_average,
        poster_path,
        overview,
        release_date,
      })
    );
  }
  const movieItem = createElement(
    /*html*/ `
    <li>
      <div class="item">
        <img
          class="thumbnail"
          src=${src}
          alt=${title}
        />
        <div class="item-desc">
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `,
    { click: onClick }
  );

  $(".item-desc", movieItem).prepend(Rate({ rate: rate }));

  return movieItem;
};

export default MovieItem;
