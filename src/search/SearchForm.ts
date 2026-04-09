export type SearchSubmitHandler = (query: string) => void | Promise<void>;

export class SearchForm {
  constructor(
    private readonly formElement: HTMLFormElement,
    private readonly inputElement: HTMLInputElement,
    private readonly onSubmit: SearchSubmitHandler,
    private readonly onEmptyQuery: () => void,
  ) {
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  private handleSubmit = async (event: Event) => {
    event.preventDefault();

    const query = this.inputElement.value.trim();

    if (!query) {
      this.onEmptyQuery();
      this.inputElement.focus();
      return;
    }

    await this.onSubmit(query);
  };

  reset(): void {
    this.inputElement.value = "";
  }
}
