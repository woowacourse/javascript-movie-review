function createButtonElement({ type, id, size, variant, textContent }) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.classList.add('btn', size, variant);
  button.textContent = textContent;
  return button;
}

function createButton(options, eventType) {
  const button = createButtonElement(options);
  if (eventType) {
    button.addEventListener(eventType.type, eventType.callbackFunction);
  }
  return button;
}

export default createButton;
