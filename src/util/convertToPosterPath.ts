import { IMAGE_BASE_URL } from '../constant/config';
import posterNotFoundImage from '../asset/poster_not_found.jpg';

export default function convertToPosterPath({ relativePath, width }: { relativePath: string; width: number }) {
  return relativePath ? `${IMAGE_BASE_URL}${width}${relativePath.toString()}` : posterNotFoundImage;
}
