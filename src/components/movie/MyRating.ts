import { createElement } from "../../utils/createElement.ts";

const MyRating = () => {
  const myRating = createElement(/*html*/ `
    <div>
        <h3>내 별점</h3>
        <div class="my-rate">
            <div>
                <img src="./images/star_empty.png" class="star" />
                <img src="./images/star_empty.png" class="star" />
                <img src="./images/star_empty.png" class="star" />
                <img src="./images/star_empty.png" class="star" />
                <img src="./images/star_empty.png" class="star" />
            </div>
            <div class="label">
                <div>평가하지 않았어요</div>
                <div class="score">(0/0)</div>
            </div>
        </div>
    </div>
    `);

  return myRating;
};

export default MyRating;
