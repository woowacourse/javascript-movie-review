import StarButton from "./StarButton.js";
import { RATING_MESSAGES } from "../../constant/constant.js";
import createStorage from "../../storage/createStorage.js";

function MyRating(title) {
    const ratingData = createStorage(`${title}`);
    const data = ratingData.get();
    const rating = data ? data : "null";
    const stars = Array.from({ length: 5 }, (_, i) => 
        i <= rating ? StarButton(true, i) : StarButton(false, i)
    ).join("");

    setTimeout(() => {
        const starEls = document.querySelectorAll(".star-button");

        starEls.forEach((movieListEl) => {
            movieListEl.addEventListener("click", async (event) => {
                ratingData.set(movieListEl.id);
                updateMyRating(title);
            });
        });
    }, 0);

    return `
    <div class="my-rating">
        <div style="display: flex;">
             ${stars}
        </div>
        <div  style="display: flex; gap: 10px;">
            <div >${RATING_MESSAGES[rating].comment}</div>
            <div class="my-rating-text">${RATING_MESSAGES[rating].rating}/10</div>
        </div>
    </div>
    `;
}

export default MyRating;

function updateMyRating( title) {
    const myRating = MyRating(title);
    document.querySelector(".my-rating-container").innerHTML = myRating;
}

