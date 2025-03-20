import createDOMElement from '../util/createDomElement';

interface ButtonProps {
  text: string;
  id: string;
  onClick?: () => void;
}

function Button({ text, onClick, id }: ButtonProps) {
  return createDOMElement({
    tag: 'button',
    className: 'primary',
    innerText: text,
    event: onClick ? { click: onClick } : undefined,
    attributes: {
      id
    }
  });
}

export default Button;
