import woowacourseLogoSrc from "../../templates/images/woowacourse_logo.png";

export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const copyright = document.createElement("p");
  copyright.textContent = "© 우아한테크코스 All Rights Reserved.";

  const logoP = document.createElement("p");
  const logoImg = document.createElement("img");
  logoImg.src = woowacourseLogoSrc;

  logoP.appendChild(logoImg);
  footer.append(copyright, logoP);

  return footer;
}
