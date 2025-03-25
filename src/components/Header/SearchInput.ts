import { $searchButton, $searchInput } from "./Element";

const SearchInput = {
  init() {
    const keydownHandler = (e: KeyboardEvent) => this.checkEnterEventHandler(e);

    $searchInput.onfocus = () => {
      addEventListener("keydown", keydownHandler);
    };
    $searchInput.onblur = () => {
      removeEventListener("keydown", keydownHandler);
    };

    $searchButton.addEventListener("click", (e) => this.onButtonClick(e));
  },

  getSearchValue() {
    return $searchInput.value;
  },

  onButtonClick(event: MouseEvent) {
    console.log(event.target, "onButtonClick 기능 미구현");
  },

  checkEnterEventHandler(event: KeyboardEvent) {
    if (event.key !== "Enter") return;
    this.onEnterKeydown(event);
  },

  onEnterKeydown(event: KeyboardEvent) {
    console.log(event.target, "onEnterKeydown 기능 미구현");
  },
};

export default SearchInput;
