import { IMAGE_BASE_URL } from '../constant/config';
import ASSETS from '../constant/assets';

export default function convertToPosterPath({ relativePath, width }: { relativePath: string; width: number }) {
  return relativePath ? `${IMAGE_BASE_URL}${width}${relativePath.toString()}` : ASSETS.posterNotFoundImage;
}
