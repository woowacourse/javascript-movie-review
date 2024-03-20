import { IMAGE_BASE_URL } from '../constant/config.js';

export default function convertToPosterPath({ relativePath, width }) {
  return `${IMAGE_BASE_URL}${width}${relativePath}`;
}
