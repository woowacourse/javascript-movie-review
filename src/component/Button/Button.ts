import { ButtonElementParams, ButtonParams } from '../../interface/ButtonInterface';

function createButtonElement({ type, id, textContent, variantClasses }: ButtonElementParams) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.classList.add('btn');
  if (variantClasses) {
    button.classList.add(...variantClasses);
  }
  button.textContent = textContent;
  return button;
}

function createButton({ options, eventType }: ButtonParams) {
  const button = createButtonElement(options);
  if (eventType) {
    button.addEventListener(eventType.type, eventType.callbackFunction);
  }
  return button;
}

export default createButton;
