import { MyVote, VoteScoreType } from "../../../domain/localStorage/myVote";

import { MovieDetailResult } from "../../../domain/api/getMovieDetail";
import MyVoteBox from "./MyVoteBox";
import STAR_FILLED from "../../../../templates/star_filled.png";
import createElement from "../../utils/createElement";

interface MovieDetailModalProps {
  movieDetail: MovieDetailResult;
  myVote: MyVote | null;
  closeModal: () => void;
  onMyVoteClick: (myVote: MyVote) => void;
}

class MovieDetailModal {
  private $element;

  private myVoteBox;

  constructor({
    movieDetail,
    myVote,
    closeModal,
    onMyVoteClick,
  }: MovieDetailModalProps) {
    this.myVoteBox = new MyVoteBox({
      myVote,
      vote: (score: VoteScoreType) => {
        this.myVoteBox.changeScore(score);
        onMyVoteClick({ movieId: movieDetail.id, score });
      },
    });

    this.$element = this.generateMovieDetailModal({
      movieDetail,
      closeModal,
    });
  }

  getElement() {
    return this.$element;
  }

  private generateMovieDetailModal({
    movieDetail,
    closeModal,
  }: {
    movieDetail: MovieDetailResult;
    closeModal: () => void;
  }) {
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
          class: "modal-container",
        },
        children: [
          createElement({
            tagName: "button",
            attribute: {
              class: "modal-title-close-button",
            },
            addEventListener: {
              click: closeModal,
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
          }),
          createElement({
            tagName: "div",
            attribute: {
              class: "modal-inner",
            },
            children: [
              createElement({
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
              }),
              createElement({
                tagName: "div",
                attribute: {
                  class: "modal-content",
                },
                children: [
                  createElement({
                    tagName: "img",
                    attribute: {
                      class: "movie-poster",
                      loading: "lazy",
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
                      createElement({
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
                                  movieDetail.genres
                                    .map((genre) => genre.name)
                                    .join(", "),
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
                                    children: [
                                      movieDetail.vote_average.toString(),
                                    ],
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
                      }),
                      this.myVoteBox.getElement(),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
    return $modal;
  }
}

export default MovieDetailModal;
