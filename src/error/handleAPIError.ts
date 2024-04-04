import {
  generateEmptyMovieListScreen,
  generateNetworkNotWorkingScreen,
} from "../components/templates/generateUnexpectedScreen";
import APIError from "./APIError";
import { $ } from "../utils/dom";
import { HTMLTemplate, TargetId } from "../types/common";

const displayErrorMessage = (
  message: string,
  screenGenerator: () => HTMLTemplate,
  targetId: string
): void => {
  const errorTargetElement = $<HTMLElement>(targetId);

  alert(message);

  if (errorTargetElement) {
    errorTargetElement.innerHTML = screenGenerator();
  }
};

export const handleAPIError = (error: unknown, targetId: TargetId): void => {
  if (error instanceof APIError) {
    displayErrorMessage(error.message, generateEmptyMovieListScreen, targetId);
  } else if (error instanceof Error) {
    displayErrorMessage(
      "네트워크가 원활하지 않습니다. 인터넷 연결 확인 후 다시 시도해주세요.",
      generateNetworkNotWorkingScreen,
      targetId
    );
  }
};
