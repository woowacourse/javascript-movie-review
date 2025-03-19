function ThumbnailImage({ title, imagePath }) {
  const $thumbnailImage = document.createElement("img");

  $thumbnailImage.classList.add("thumbnail");
  $thumbnailImage.classList.src = imagePath;
  $thumbnailImage.classList.alt = `${title} Thumbnail 이미지`;

  return $thumbnailImage;
}

export default ThumbnailImage;
