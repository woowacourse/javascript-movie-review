import { getOriginalImageUrl } from '../../api/renderImage.ts';
import { MovieData } from '../../api/type.ts';
import { HeaderTop } from './HeaderTop.ts';
import { Overlay } from './Overlay.ts';
import { TopRate } from './TopRate.ts';

export const HeaderContainer = (data: MovieData) => {
  const $header = document.createElement('header');

  const $backgroundContainer = document.createElement('div');
  $backgroundContainer.className = 'background-container';
  $backgroundContainer.style.backgroundImage = `url(${getOriginalImageUrl(data.backdrop_path)})`;

  const $topRateContainer = document.createElement('div');
  $topRateContainer.className = 'top-rated-container';

  $header.append($backgroundContainer);
  $backgroundContainer.append(Overlay(), $topRateContainer);
  $topRateContainer.append(HeaderTop(), TopRate(data));

  return $header;
};
