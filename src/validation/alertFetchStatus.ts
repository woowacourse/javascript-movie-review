import { ERROR_MESSAGE } from '../constant/index';

export default function alertFetchStatus(status: number) {
  if (status >= 500) {
    window.alert(ERROR_MESSAGE.noResponse);
    return true;
  } else if (status >= 400) {
    window.alert(ERROR_MESSAGE.wrongRequset);
    return true;
  }

  return false;
}
