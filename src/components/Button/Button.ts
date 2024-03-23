import IButton from '../../interfaces/IButton';

const Button = {
  create(buttonInformation: IButton): HTMLElement {
    const button = document.createElement('button');

    button.textContent = `${buttonInformation.innerText}`;
    buttonInformation.classList.forEach((className) => button.classList.add(className));

    return button;
  },
};

export default Button;
