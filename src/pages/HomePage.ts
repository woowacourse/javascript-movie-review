import { ResponseMovie } from '../api/type.ts';
import { HeaderContainer } from '../components/header/HeaderContainer.ts';
import { MainContainer } from '../components/main/MainContainer.ts';

export const HomePage = ($target: Element, res: ResponseMovie) => {
  if (res) {
    $target.append(HeaderContainer(res.results[0]), MainContainer(res.results));
  }
};
