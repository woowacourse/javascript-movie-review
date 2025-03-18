interface ITextButton {
  title: string;
  onClick(): void;
  type: "primary" | "secondary";
}

class TextButton {
  #title;
  #onClick;
  #type;

  constructor({ title, onClick, type }: ITextButton) {
    this.#title = title;
    this.#onClick = onClick;
    this.#type = type;
  }

  create() {
    const buttonElement = document.createElement("button");
    buttonElement.classList.add(this.#type);
    buttonElement.textContent = this.#title;
    buttonElement.onclick = this.#onClick;

    return buttonElement;
  }
}

export default TextButton;
