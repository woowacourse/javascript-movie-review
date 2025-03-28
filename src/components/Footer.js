import createElement from "./utils/createElement";
import LogoImage from "../../images/woowacourse_logo.png";

const Footer = () => {
  const $footer = createElement({
    tag: "footer",
    classNames: ["footer"],
  });

  const $copy = createElement({
    tag: "p",
  });

  const $p = createElement({
    tag: "p",
  });

  const $img = createElement({
    tag: "img",
    src: LogoImage,
    width: "180",
  });

  const COPY_TEXT = "우아한테크코스 All Rights Reserved.";
  $copy.textContent = COPY_TEXT;

  $footer.appendChild($copy);
  $footer.appendChild($p);
  $p.appendChild($img);

  return $footer;
};

export default Footer;
