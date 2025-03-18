import createElement from './utils/createElement';

const Button = ({ text }) => {
  const $button = createElement({
    tag: 'button',
    classNames: ['primary', 'detail'],
  });

  $button.textContent = text;

  return $button;
};

export default Button;
