class AddButtonView {
  #addButton: HTMLButtonElement | null;

  constructor() {
    this.#addButton = document.querySelector<HTMLButtonElement>("#add-button");
  };

  bindAddButtonClick(handler: () => void) {
    this.#addButton?.addEventListener('click', () => {
      handler();
    })
  };

  hideAddButton() {
    if (this.#addButton) this.#addButton.style.display = 'none';
  };
}

export const addButtonView = new AddButtonView();
