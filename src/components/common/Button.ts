type ButtonProps = {
  text: string;
  className: string[];
};

const Button = ({ text, className }: ButtonProps) => {
  const button = document.createElement("button");
  button.classList.add(...className);
  button.textContent = text;

  return button;
};
export default Button;
