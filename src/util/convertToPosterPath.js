import { IMAGE_BASE_URL } from '../constant/config.js';
import posterNotFoundImage from '../asset/poster_not_found.jpg';

export default function convertToPosterPath({ relativePath, width }) {
  return relativePath ? `${IMAGE_BASE_URL}${width}${relativePath}` : posterNotFoundImage;
}
