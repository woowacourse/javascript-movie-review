type Props = {
  text: string;
  className: string[];
};

const Button = ({ text, className }: Props) => {
  const button = document.createElement("button");
  button.classList.add(...className);
  button.textContent = text;

  return button;
};
export default Button;
