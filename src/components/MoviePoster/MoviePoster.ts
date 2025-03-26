import { MovieDetail } from "../../../types/type";

const defaultPosterPath = "./default-poster.svg";
const imagePathPreFix = "https://image.tmdb.org/t/p/w440_and_h660_face";

const $MoviePoster = ({
  title,
  poster_path,
}: Pick<MovieDetail, "title" | "poster_path">) => {
  const $poster = createElement("img", {
    className: "thumbnail",
    src: "./placeholder-poster.svg",
    alt: title,
    loading: "lazy",
    onerror: "this.src='./error-poster.svg'",
    onload: function () {
      this.src = poster_path
        ? imagePathPreFix + poster_path
        : defaultPosterPath;
    },
  });

  return $poster;
};

export default $MoviePoster;
