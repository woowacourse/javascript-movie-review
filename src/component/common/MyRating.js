import StarButton from "./StarButton.js";
import { RATING_MESSAGES } from "../../constant/constant.js";

function MyRating(){
    const rating = "0";

    const stars = Array.from({ length: 5 }, (_, i) => 
        i <= RATING_MESSAGES[rating].star ? StarButton(true) : StarButton(false)
    ).join("");

    return `
    <div style="display: flex; gap: 10px;">
        <div style="display: flex;">
             ${stars}
        </div>
        <div>${RATING_MESSAGES[rating].comment
        }</div>
        <div class="my-rating-text">${rating}/10</div>
    </div>
    `
}

export default MyRating