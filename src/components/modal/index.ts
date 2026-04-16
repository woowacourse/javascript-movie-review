import { ModalViewModel } from "./ModalViewModel";
import { ModalView } from "./ModalView";

export class Modal {
  element: HTMLDialogElement;

  private viewModel: ModalViewModel;
  private view: ModalView;

  constructor() {
    this.viewModel = new ModalViewModel();
    this.view = new ModalView({
      onClose: () => this.close(),
      onStarHover: (score) => this.view.renderRating(score),
      onStarLeave: () => this.view.renderRating(this.viewModel.getSavedRating()),
      onStarClick: (score) => this.viewModel.setRating(score),
    });

    this.element = this.view.element;

    this.viewModel.subscribe((state) => this.view.render(state));
  }

  open(id: number): void {
    this.element.showModal();
    this.viewModel.open(id);
  }

  close(): void {
    this.element.close();
  }
}
