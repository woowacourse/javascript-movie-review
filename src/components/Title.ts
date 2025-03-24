type TitleProps = {
  text: string;
};

const Title = ({ text}: TitleProps) => {
  const title = document.createElement("h2");
  title.classList.add("main-title");
  title.textContent = text;

  return title;
};

export default Title;
