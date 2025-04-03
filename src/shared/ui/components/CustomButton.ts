interface ICustomButton {
  title: string;
  className?: string;
}

export const CustomButton = ({ title, className = "" }: ICustomButton) => {
  return `
    <button class="primary detail ${className}">
      ${title}
    </button>
  `;
};
