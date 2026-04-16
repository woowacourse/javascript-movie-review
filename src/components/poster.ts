export function createPoster(
  posterSrc: string | null,
  title: string,
): HTMLImageElement | HTMLDivElement {
  if (!posterSrc) {
    const fallback = document.createElement("div");
    fallback.className = "thumbnail thumbnail-fallback";
    fallback.textContent = title;
    return fallback;
  }

  const img = document.createElement("img");
  img.className = "thumbnail";
  img.src = posterSrc;
  img.alt = title;
  img.onerror = () => {
    img.style.display = "none";
    const fallback = document.createElement("div");
    fallback.className = "thumbnail thumbnail-fallback";
    fallback.textContent = title;
    img.parentElement?.insertBefore(fallback, img);
  };
  return img;
}
