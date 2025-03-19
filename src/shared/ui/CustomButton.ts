interface ICustomButton {
  title: string;
  className?: string;
}

export const CustomButton = ({ title, className }: ICustomButton) => {
  const customButton = document.createElement("button");
  customButton.className = `primary detail ${className}`;
  customButton.textContent = title;

  return customButton;
};
