const ERROR_THUMBNAIL_IMAGE =
  'https://dino-typing.com/data/file/dino_color/2038718610_IfTXhGvO_20f04c8989c435c3a4912831703adb190be75c97.png';

const handleImageLoadError = ($thumbnail: HTMLImageElement) => {
  $thumbnail.src = ERROR_THUMBNAIL_IMAGE;
};

export default handleImageLoadError;
