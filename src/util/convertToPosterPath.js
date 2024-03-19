import { IMAGE_BASE_URL } from '../constants/config.js';

export default function convertToPosterPath({ relativePath, width }) {
  return `${IMAGE_BASE_URL}${width}${relativePath}`;
}
