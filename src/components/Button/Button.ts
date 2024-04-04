import IButton from '../../interfaces/IButton';

const Button = {
  create(buttonInformation: IButton, eventHandler?: Function): HTMLElement {
    const button = document.createElement('button');

    button.textContent = `${buttonInformation.innerText}`;
    buttonInformation.classes.forEach((className) => button.classList.add(className));

    if (eventHandler) {
      button.addEventListener('click', () => {
        eventHandler();
      });
    }

    return button;
  },
};

export default Button;
