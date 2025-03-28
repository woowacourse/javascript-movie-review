type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  const detailButton = document.createElement("button");
  detailButton.classList.add("detail-button", "primary");

  detailButton.textContent = text;

  detailButton.addEventListener("click", onClick);

  return detailButton;
};

export default Button;
