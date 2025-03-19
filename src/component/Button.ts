interface Button {
  text: string;
}

function Button({ text }: Button) {
  return `<button class="primary">${text}</button>`;
}

export default Button;
