import { $searchButton } from "./Element";

const SearchInput = {
  init() {
    $searchButton.addEventListener("click", (e) => this.onButtonClick(e));
  },

  onButtonClick(event: MouseEvent) {
    console.log(event.target, "onButtonClick 기능 미구현");
  },
};

export default SearchInput;
