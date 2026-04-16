import { setRate } from "../api/setRate";
import { ERROR_MESSAGE } from "../constants/error";
import { ResponseError } from "../error/responseError";

export async function rateController(
  rate: string,
  modalView: ModalViewType,
  state: AppStateType,
) {
  try {
    await setRate(state.getCurrentMovie(), rate);
    modalView.renderRate(Number(rate));
  } catch (error) {
    if (error instanceof ResponseError) {
      if (error.type === "HTTP") {
        modalView.showToast(ERROR_MESSAGE.HTTP);
        return;
      }
      if (error.type === "NETWORK") {
        modalView.showToast(ERROR_MESSAGE.NETWORK);
        return;
      }
    }
    modalView.showToast(ERROR_MESSAGE.DEFAULT);
  }
}
