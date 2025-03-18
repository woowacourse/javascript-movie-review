interface Button {
  text: string;
}

function Button({ text }: Button) {
  return `<button class="primary detail">${text}</button>`;
}

export default Button;
