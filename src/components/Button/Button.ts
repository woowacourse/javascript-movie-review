import Button from '../../interfaces/Button';

const Button = {
  create(buttonInformation: Button, onButtonClick?: () => void): HTMLElement {
    const button = document.createElement('button');

    button.textContent = `${buttonInformation.innerText}`;
    buttonInformation.classList.forEach((className) => button.classList.add(className));

    if (onButtonClick) button.addEventListener('click', onButtonClick);

    return button;
  },
};

export default Button;
