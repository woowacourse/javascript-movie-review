import createDOMElement from '../util/createDomElement';

type ButtonType = Partial<HTMLButtonElement>;

interface ButtonProps extends ButtonType {
  text: string;
  id: string;
  onClick?: () => void;
}

function Button({ text, id, className = 'primary', onClick, ...rest }: ButtonProps) {
  return createDOMElement({
    tag: 'button',
    className: 'primary',
    innerText: text,
    event: onClick ? { click: onClick } : undefined,
    attributes: {
      id,
      ...rest
    }
  });
}

export default Button;
