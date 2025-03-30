interface ICustomButton {
  title: string;
  className?: string;
  id?: string;
}

export const CustomButton = ({
  title,
  className = "",
  id = "",
}: ICustomButton) => {
  const customButton = document.createElement("button");
  customButton.className = `primary ${className}`;
  customButton.textContent = title;
  customButton.id = id;

  return customButton;
};
