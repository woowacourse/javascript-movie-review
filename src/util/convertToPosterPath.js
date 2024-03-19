export default function convertToPosterPath({ relativePath, width }) {
  return `https://image.tmdb.org/t/p/w${width}${relativePath}`;
}
