export const mappedImage =  (imageSrc: string) => {
  const mappedImage = imageSrc
    ? `https://image.tmdb.org/t/p/w500${imageSrc}`
    : "images/nullImage.png";

  return mappedImage;
}
