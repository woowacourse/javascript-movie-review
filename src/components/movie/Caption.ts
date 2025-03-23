type Props = {
  title: string;
};

const Caption = ({ title }: Props) => {
  const caption = document.createElement("h2");
  caption.setAttribute("id", "caption");
  caption.innerText = title;

  return caption;
};

export default Caption;
