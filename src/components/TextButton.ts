interface TextButtonProps {
  id: string;
  title: string;
  onClick(): void;
  type: "primary" | "secondary";
}

class TextButton {
  #id;
  #title;
  #onClick;
  #type;

  constructor({ id, title, onClick, type }: TextButtonProps) {
    this.#id = id;
    this.#title = title;
    this.#onClick = onClick;
    this.#type = type;
  }

  create() {
    const buttonElement = document.createElement("button");
    buttonElement.id = this.#id;
    buttonElement.classList.add(this.#type);
    buttonElement.textContent = this.#title;
    buttonElement.onclick = this.#onClick;

    return buttonElement;
  }
}

export default TextButton;
