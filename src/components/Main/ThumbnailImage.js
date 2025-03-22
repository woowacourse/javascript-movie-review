function ThumbnailImage({ title, poster_path }) {
  if (!poster_path) {
    const $titleElement = document.createElement("p");
    $titleElement.classList.add("thumbnail-title");
    $titleElement.textContent = title;
    return $titleElement;
  }

  const $thumbnailImage = document.createElement("img");
  $thumbnailImage.classList.add("thumbnail");

  const defaultImage = "./default_poster_image.png";
  $thumbnailImage.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`;
  $thumbnailImage.alt = `${title} Thumbnail 이미지`;

  $thumbnailImage.onerror = () => {
    $thumbnailImage.src = defaultImage;
  };

  return $thumbnailImage;
}

export default ThumbnailImage;
