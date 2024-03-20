function createButton({ type, size, variant, name }) {
  const button = document.createElement('button');
  button.classList.add('btn', size, variant);
  button.textContent = name;
  button.type = type;

  return button;
}

export default createButton;
