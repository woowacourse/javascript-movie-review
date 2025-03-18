type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  const detailButton = document.createElement("button");
  detailButton.classList.add("detail-button", "primary");

  if (!text) {
    throw new Error("text가 존재하지 않습니다.");
  }

  detailButton.textContent = text;

  // TODO 버튼 클릭 이벤트
  detailButton.addEventListener("click", onClick);

  return detailButton;
};

export default Button;
