import { MyVote, VoteScoreType } from "../../../domain/localStorage/myVote";

import STAR_EMPTY from "../../../../templates/star_empty.png";
import STAR_FILLED from "../../../../templates/star_filled.png";
import createElement from "../../utils/createElement";

const scoreMessageMapper = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

interface MyVoteBoxProps {
  myVote: MyVote | null;
  vote: (score: VoteScoreType) => void;
}

class MyVoteBox {
  private $element;

  private props;
  private score;
  private message;

  constructor(props: MyVoteBoxProps) {
    this.props = props;

    this.score = this.props.myVote?.score;
    this.message = this.props.myVote?.score
      ? scoreMessageMapper[this.props.myVote?.score]
      : "별점을 남겨주세요!";

    this.$element = createElement({
      tagName: "div",
      attribute: {
        class: "my-vote",
      },
      children: [
        "내 별점",
        createElement({
          tagName: "div",
          attribute: {
            class: "my-vote-stars",
          },
          children: [...this.generateStars()],
        }),
        this.score ? this.score.toString() : "",
        this.message,
      ],
    });
  }

  getElement() {
    return this.$element;
  }

  changeScore(score: VoteScoreType) {
    this.score = score;
    this.message = scoreMessageMapper[score];

    this.$element.replaceChildren(
      "내 별점",
      createElement({
        tagName: "div",
        attribute: {
          class: "my-vote-stars",
        },
        children: [...this.generateStars()],
      }),
      this.score ? this.score.toString() : "",
      this.message
    );
  }

  generateStars() {
    return Array.from({ length: 5 }).map((_, index) => {
      if (this.score && index < this.score / 2) {
        return createElement({
          tagName: "img",
          attribute: {
            src: STAR_FILLED,
          },
          addEventListener: {
            click: () => this.props.vote(((index + 1) * 2) as VoteScoreType),
          },
        });
      }

      return createElement({
        tagName: "img",
        attribute: {
          src: STAR_EMPTY,
        },
        addEventListener: {
          click: () => this.props.vote(((index + 1) * 2) as VoteScoreType),
        },
      });
    });
  }
}

export default MyVoteBox;
