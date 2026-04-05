import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";
import { errorToUserMessage } from "../errors/errorToUserMessage";

const notify = (status: "error" | "warning", title: string, text: string) => {
  new Notify({
    status,
    title,
    text,
    effect: "fade",
    speed: 300,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    type: "outline",
    position: "right top",
  });
};

export const notifyError = (error: unknown) => {
  notify("error", "오류가 발생했습니다", errorToUserMessage(error));
};

export const notifyEmptyQuery = () => {
  notify("warning", "검색어를 입력해주세요", "영화 제목을 입력한 뒤 다시 시도해주세요.");
};
