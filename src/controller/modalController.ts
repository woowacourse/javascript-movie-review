import { getDetail } from "../api/getDetail";
import { getRate } from "../api/getRate";
import { ERROR_MESSAGE } from "../constants/error";
import { ResponseError } from "../error/responseError";

export async function modalController(
  id: string,
  modalView: ModalViewType,
  state: AppStateType,
) {
  try {
    modalView.spinnerRender();
    const movieDetail = await getDetail(Number(id));
    state.setCurrentMovie(id);

    const myRate = await getRate(id);
    if (myRate === 0) {
      modalView.render(movieDetail, 0);
      return;
    }
    modalView.render(movieDetail, myRate);
  } catch (error) {
    if (error instanceof ResponseError) {
      if (error.type === "HTTP") {
        modalView.errorRender(ERROR_MESSAGE.HTTP);
        return;
      }
      if (error.type === "NETWORK") {
        modalView.errorRender(ERROR_MESSAGE.NETWORK);
        return;
      }
    }
    modalView.errorRender(ERROR_MESSAGE.DEFAULT);
  }
}
