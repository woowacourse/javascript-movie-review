import Button from '../../interfaces/Button';

const Button = {
  create(buttonInformation: Button): HTMLElement {
    const button = document.createElement('button');

    button.textContent = `${buttonInformation.innerText}`;
    buttonInformation.classList.forEach((className) => button.classList.add(className));

    return button;
  },
};

export default Button;
