import { MovieDetail } from "../../../types/type";

const defaultPosterPath = "./default-poster.svg";
const imagePathPreFix = "https://image.tmdb.org/t/p/w440_and_h660_face";

interface MoviePosterProps extends Pick<MovieDetail, "title" | "poster_path"> {
  className: string;
}

const $MoviePoster = ({ className, title, poster_path }: MoviePosterProps) => {
  const $poster = createElement("img", {
    className,
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
