import Notify from "simple-notify";
import { errorToUserMessage } from "../errors/errorToUserMessage";

export class Notifier {
  /** unknown error 를 받아 사용자 메시지로 변환 후 에러 토스트. */
  error(error: unknown): void {
    this.show("error", "오류가 발생했습니다", errorToUserMessage(error));
  }

  /** 빈 검색어 등 경고성 알림. */
  warn(title: string, text: string): void {
    this.show("warning", title, text);
  }

  private show(status: "error" | "warning", title: string, text: string): void {
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
  }
}