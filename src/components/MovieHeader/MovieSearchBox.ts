import generateSearchBox from "../common/generateSearchBox";

interface MovieSearchBoxProps {
  search: (query: string) => void;
}

class MovieSearchBox {
  $element;
  query = "";
  PLACEHOLDER = "검색";

  constructor({ search }: MovieSearchBoxProps) {
    this.$element = generateSearchBox({
      placeholder: this.PLACEHOLDER,
      buttonText: this.PLACEHOLDER,
      onClickHandler: () => {
        search(this.query);
      },
      onChangeHandler: (e: Event) => {
        if (e.target === null) {
          return;
        }
        if (!(e.target instanceof HTMLInputElement)) {
          return;
        }
        this.query = e.target.value;
      },
      onKeyDownHandler: (e: Event) => {
        if (!(e instanceof KeyboardEvent)) {
          return;
        }
        if (e.key === "Enter") {
          search(this.query);
        }
      },
    });
  }
}

export default MovieSearchBox;
