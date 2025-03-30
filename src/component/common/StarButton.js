import { RATING_MESSAGES } from "../../constant/constant.js";

function StarButton(state, i) {
    const rating = Object.entries(RATING_MESSAGES)
    
    return state 
        ? `<img src="./images/star_filled.png" id="${i}" class="star-button" />`
        : `<img src="./images/star_empty.png" id="${i}" class="star-button" />`;
}

export default StarButton;
