import ButtonData from '../../interfaces/ButtonData';

const Button = {
  create(buttonData: ButtonData, onButtonClick?: () => void): HTMLElement {
    const button = document.createElement('button');

    button.textContent = `${buttonData.innerText}`;
    buttonData.classList.forEach((className) => button.classList.add(className));

    if (onButtonClick) button.addEventListener('click', onButtonClick);

    return button;
  },
};

export default Button;
