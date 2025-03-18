import { Movie } from "../main";
import { IMAGE_BASE_URL } from "./MovieList";

const Header = (topRatedMovie: Movie) => {
  return /*html*/ `
    <header>
        <div class="background-container" style="background-image: url(${IMAGE_BASE_URL}${topRatedMovie.poster_path})">
            <div class="overlay" aria-hidden="true"></div>
            <div class="top-rated-container">
            <h1 class="logo">
                <img src="./images/logo.png" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
                <div class="rate">
                <img src="./images/star_empty.png" class="star" />
                <span class="rate-value">${topRatedMovie.vote_average}</span>
                </div>
                <div class="title">${topRatedMovie.title}</div>
                <button class="primary detail">자세히 보기</button>
            </div>
            </div>
        </div>
    </header>
`;
};

export default Header;
