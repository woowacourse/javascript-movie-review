import createElement from "../utils/createElement";

export type SearchType = (query: string) => void;

interface MovieSearchBoxProps {
  searchBoxSubmitHandler: SearchType;
}

class MovieSearchBox {
  private static PLACEHOLDER = "검색";

  private $element;
  private props;

  private visible;

  constructor(props: MovieSearchBoxProps) {
    this.props = props;

    this.visible = true;

    this.$element = this.generateSearchBox();
  }

  getElement() {
    return this.$element;
  }

  makeVisible() {
    this.visible = true;
    this.$element.style.display = "block";
  }

  makeInvisible() {
    this.visible = false;
    this.$element.style.display = "none";
  }

  clear() {
    if (this.$element instanceof HTMLFormElement) {
      this.$element.reset();
    }
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

  private generateSearchBox() {
    const $input = createElement({
      tagName: "input",
      attribute: {
        placeholder: MovieSearchBox.PLACEHOLDER,
        type: "text",
        name: "query",
      },
    });

    const $button = createElement({
      tagName: "button",
      attribute: { class: "search-button" },
      children: [MovieSearchBox.PLACEHOLDER],
    });

    const $form = createElement({
      tagName: "form",
      attribute: {
        class: `search-box`,
      },
      addEventListener: {
        submit: this.searchByQuery.bind(this),
      },
      children: [$input, $button],
    });

    return $form;
  }
}

export default MovieSearchBox;
