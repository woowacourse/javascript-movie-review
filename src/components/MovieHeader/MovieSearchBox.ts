import generateSearchBox from "../common/generateSearchBox";

export type SearchType = (query: string) => void;

interface MovieSearchBoxProps {
  searchBoxSubmitHandler: SearchType;
}

class MovieSearchBox {
  private static PLACEHOLDER = "검색";

  props;
  $element;

  constructor(props: MovieSearchBoxProps) {
    this.props = props;

    this.$element = generateSearchBox({
      placeholder: MovieSearchBox.PLACEHOLDER,
      buttonText: MovieSearchBox.PLACEHOLDER,
      onSubmitHandler: this.searchByQuery.bind(this),
    });
  }

  private searchByQuery(e: Event) {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }

    try {
      const query = e.target["query"].value;
      this.validateQuery(query);
      this.props.searchBoxSubmitHandler(query);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  private validateQuery(query: string) {
    if (query.trim().length === 0) {
      throw new Error("검색어를 입력해주세요.");
    }
    if (query.length > 500) {
      throw new Error("검색어는 500자 미만으로 입력해주세요.");
    }
  }
}

export default MovieSearchBox;
