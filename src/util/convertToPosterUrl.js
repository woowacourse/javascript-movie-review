export default function convertToPosterUrl({ relativeUrl, width }) {
  return `https://image.tmdb.org/t/p/w${width}${relativeUrl}`;
}
