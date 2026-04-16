export function requireElement<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`요소를 찾을 수 없습니다: ${selector}`);
  return el;
}

export function loadImageWithFallback(
  image: HTMLImageElement,
  src: string,
  fallbackSrc: string,
): void {
  image.style.opacity = "0";
  image.onload = null;
  image.onerror = null;

  image.onload = () => {
    image.style.opacity = "1";
  };

  image.onerror = () => {
    image.onerror = null;
    image.src = fallbackSrc;
    image.style.opacity = "1";
  };

  image.src = src;
}
