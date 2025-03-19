function ThumbnailImage({ title, imagePath }) {
  const $thumbnailImage = document.createElement("img");

  $thumbnailImage.classList.add("thumbnail");
  $thumbnailImage.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${imagePath}`;
  $thumbnailImage.alt = `${title} Thumbnail 이미지`;

  return $thumbnailImage;
}

export default ThumbnailImage;
