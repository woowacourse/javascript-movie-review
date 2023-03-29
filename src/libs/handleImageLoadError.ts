const ERROR_THUMBNAIL_IMAGE =
  'https://user-images.githubusercontent.com/112997662/223046479-306cc6a7-7024-4616-b28e-be2f2878d2f0.png';

const handleImageLoadError = ($thumbnail: HTMLImageElement) => {
  $thumbnail.src = ERROR_THUMBNAIL_IMAGE;
};

export default handleImageLoadError;
