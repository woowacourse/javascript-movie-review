import createDOMElement from '../util/createDomElement';

interface ButtonProps {
  text: string;
  id: string;
  onClick?: () => void;
  className?: string;
}

function Button({ text, onClick, id, className }: ButtonProps) {
  return createDOMElement({
    className,
    tag: 'button',
    textContent: text,
    event: onClick ? { click: onClick } : undefined,
    attributes: {
      id
    }
  });
}

export default Button;
