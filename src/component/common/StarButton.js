import { RATING_MESSAGES } from "../../constant/constant.js";

function StarButton(state, i) {
    const id = i;
    
    return state 
        ? `<img src="./images/star_filled.png" id="${id}" class="star-button" />`
        : `<img src="./images/star_empty.png" id="${id}" class="star-button" />`;
}

export default StarButton;
