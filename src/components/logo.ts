export function createLogo(logoSrc: string, altText: string = "MovieList"): HTMLElement {
  const h1 = document.createElement("h1");
  h1.className = "logo";

  const img = document.createElement("img");
  img.src = logoSrc;
  img.alt = altText;

  h1.appendChild(img);
  return h1;
}
