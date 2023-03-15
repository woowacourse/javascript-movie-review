import CustomComponent from "../../abstracts/CustomComponent";
import StarEmptyImg from "../../../templates/star_empty.png";
import StarFilledImg from "../../../templates/star_filled.png";

export default class MovieComponent extends CustomComponent {
  template() {
    const title = this.getAttribute("title");
    const voteAverage = this.getAttribute("vote_average");
    const posterPath = this.getAttribute("poster_path");

    console.log({ title, voteAverage, posterPath });
    return `
            <li>
                <a href="#">
                <div class="item-card">
                    <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
                    loading="lazy"
                    alt=${title}
                    />
                    <p class="item-title">${title}</p>
                    <p class="item-score"><img src=${StarFilledImg} alt="별점" /> ${voteAverage}</p>
                </div>
                </a>
            </li>
        `;
  }
}
customElements.define("movie-item", MovieComponent);
