export function createLogo(
  logoSrc: string,
  altText: string = "MovieList",
): HTMLElement {
  const anchor = document.createElement("a");
  anchor.className = "logo";

  const img = document.createElement("img");
  img.src = logoSrc;
  img.alt = altText;

  anchor.appendChild(img);
  return anchor;
}
