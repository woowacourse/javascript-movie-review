import { MyVote, VoteScoreType } from "../../../domain/localStorage/myVote";

import { MovieDetailResult } from "../../../domain/api/getMovieDetail";
import MyVoteBox from "./MyVoteBox";
import STAR_FILLED from "../../../../templates/star_filled.png";
import createElement from "../../utils/createElement";

interface MovieDetailModalProps {
  closeModal: () => void;
}

class MovieDetailModal {
  private $element;

  private props;

  private myVoteBox: MyVoteBox | null;

  constructor(props: MovieDetailModalProps) {
    this.props = props;

    this.myVoteBox = null;

    this.$element = this.generateModal(this.props.closeModal);
  }

  getElement() {
    return this.$element;
  }

  fillContent({
    movieDetail,
    myVote,
    onMyVoteClick,
  }: {
    movieDetail: MovieDetailResult;
    myVote: MyVote | null;
    onMyVoteClick: (myVote: MyVote) => void;
  }) {
    this.myVoteBox = new MyVoteBox({
      myVote,
      vote: (score: VoteScoreType) => {
        if (!this.myVoteBox) {
          return;
        }

        this.myVoteBox.changeScore(score);
        onMyVoteClick({ movieId: movieDetail.id, score });
      },
    });

    const modalContainer = createElement({
      tagName: "div",
      attribute: {
        class: "modal-container",
      },
      children: [
        this.generateCloseButton(),
        this.generateModalInner({ movieDetail }),
      ],
    });

    this.$element.append(modalContainer);

    const spinner = this.$element.querySelector(".spinner");
    if (spinner) {
      this.$element.removeChild(spinner);
    }
  }

  private generateModal(closeModal: () => void) {
    const $modal = createElement({
      tagName: "div",
      attribute: { class: "modal" },
    });

    $modal.append(
      createElement({
        tagName: "div",
        attribute: {
          class: "modal-backdrop",
        },
        addEventListener: {
          click: closeModal,
        },
      }),
      createElement({
        tagName: "div",
        attribute: {
          class: "spinner",
        },
      })
    );
    return $modal;
  }

  private generateCloseButton() {
    return createElement({
      tagName: "button",
      attribute: {
        class: "modal-title-close-button",
      },
      addEventListener: {
        click: this.props.closeModal,
      },
      children: [
        createElement({
          tagName: "p",
          attribute: {
            class: "modal-title-close-button-text",
          },
          children: ["X"],
        }),
      ],
    });
  }

  private generateModalInner({
    movieDetail,
  }: {
    movieDetail: MovieDetailResult;
  }) {
    return createElement({
      tagName: "div",
      attribute: {
        class: "modal-inner",
      },
      children: [
        this.generateModalInnerTitle(movieDetail),
        this.generateModalInnerContent(movieDetail),
      ],
    });
  }

  private generateModalInnerTitle(movieDetail: MovieDetailResult) {
    return createElement({
      tagName: "div",
      attribute: {
        class: "modal-title",
      },
      children: [
        createElement({
          tagName: "h2",
          attribute: {
            class: "modal-title-content",
          },
          children: [movieDetail.title],
        }),
      ],
    });
  }

  private generateModalInnerContent(movieDetail: MovieDetailResult) {
    return createElement({
      tagName: "div",
      attribute: {
        class: "modal-content",
      },
      children: [
        createElement({
          tagName: "img",
          attribute: {
            class: "movie-poster skeleton",
            alt: "movie-poster",
            src: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
          },
        }),
        createElement({
          tagName: "div",
          attribute: {
            class: "movie-info",
          },
          children: [
            this.generateModalInnerMovieInfoContent(movieDetail),
            this.myVoteBox ? this.myVoteBox.getElement() : "",
          ],
        }),
      ],
    });
  }

  private generateModalInnerMovieInfoContent(movieDetail: MovieDetailResult) {
    return createElement({
      tagName: "div",
      attribute: {
        class: "movie-info-content",
      },
      children: [
        createElement({
          tagName: "div",
          attribute: {
            class: "genre-and-vote-average",
          },
          children: [
            createElement({
              tagName: "div",
              attribute: {
                class: "genre",
              },
              children: [
                movieDetail.genres.map((genre) => genre.name).join(", "),
              ],
            }),
            createElement({
              tagName: "div",
              attribute: {
                class: "vote-average",
              },
              children: [
                createElement({
                  tagName: "img",
                  attribute: {
                    src: STAR_FILLED,
                    alt: "별점",
                  },
                }),
                createElement({
                  tagName: "span",
                  children: [movieDetail.vote_average.toString()],
                }),
              ],
            }),
          ],
        }),
        createElement({
          tagName: "div",
          attribute: {
            class: "overview",
          },
          children: [movieDetail.overview],
        }),
      ],
    });
  }
}

export default MovieDetailModal;
