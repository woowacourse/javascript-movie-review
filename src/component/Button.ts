import createDOMElement from '../util/createDomElement';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return createDOMElement({
    tag: 'button',
    className: 'primary',
    innerText: text,
    event: onClick ? { click: onClick } : undefined
  });
}

export default Button;
