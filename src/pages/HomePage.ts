import { ResponseMovie } from '../api/type.ts';
import { HeaderContainer } from '../components/header/HeaderContainer.ts';

export const HomePage = ($target: Element, data: ResponseMovie) => {
  if (data) $target.append(HeaderContainer(data.results[0]));
};
