class AddButtonView {
  #addButton;

  constructor() {
    this.#addButton =  document.querySelector<HTMLButtonElement>("#add-button");
  };

  bindAddButtonClick(handler: () => void) {
    this.#addButton?.addEventListener('click', () => {
      handler();
    })
  };

  hideAddButton() {
    if (this.#addButton) this.#addButton.classList.add("hidden");
  };

  showAddButton() {
    if (this.#addButton) this.#addButton.classList.remove("hidden");
  };
}

export const addButtonView = new AddButtonView();
