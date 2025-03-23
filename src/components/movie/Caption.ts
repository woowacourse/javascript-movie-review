type CaptionProps = {
  title: string;
};

const Caption = ({ title }: CaptionProps) => {
  const caption = document.createElement("h2");
  caption.setAttribute("id", "caption");
  caption.innerText = title;

  return caption;
};

export default Caption;
