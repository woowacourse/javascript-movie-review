import { modalView } from "../view/modalView";

export function errorMovieDetail(errorMessage: string) {
  console.log("에러 원인:", errorMessage);
  modalView.renderError();
}
