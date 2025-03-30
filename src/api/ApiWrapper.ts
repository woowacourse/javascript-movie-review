import Spinner from "../component/Spinner";
import { ERROR_MESSAGE } from "../constant/errorMessage";
import MessageModalController from "../controller/MessageModalController";

const spinnerElement = Spinner();
document.body.appendChild(spinnerElement);

const messageModalController = new MessageModalController();

export async function ApiWrapper<T>(callback: () => Promise<T>) {
  spinnerElement.classList.add("active");

  try {
    const result = await callback();
    return result;
  } catch (error) {
    const msg = ERROR_MESSAGE[Number((error as Error).message)] || "알 수 없는 오류가 발생했습니다.";
    messageModalController.changeContentMessage(msg);
    messageModalController.messageModalElement.showModal();
  } finally {
    spinnerElement.classList.remove("active");
  }
}
