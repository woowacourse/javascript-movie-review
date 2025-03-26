function ThumbnailImage({ title, poster_path }) {
  const $thumbnailImage = document.createElement("img");
  $thumbnailImage.classList.add("thumbnail");
  $thumbnailImage.classList.add("skeleton");

  $thumbnailImage.onload = () => {
    $thumbnailImage.classList.remove("skeleton");
  };

  if (!poster_path) {
    $thumbnailImage.src = "./default_poster_image.png";
  } else {
    $thumbnailImage.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`;
  }
  $thumbnailImage.alt = `${title} Thumbnail 이미지`;

  return $thumbnailImage;
}

export default ThumbnailImage;
