function StarButton(state) {
    return state 
        ? `<img src="./images/star_filled.png" class="star" />`
        : `<img src="./images/star_empty.png" class="star" />`;
}

export default StarButton;
