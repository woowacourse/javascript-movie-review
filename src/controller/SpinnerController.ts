import Spinner from "../components/Spinner";
import { eventEmitter } from "../util/eventEmitter";

class SpinnerController {
  spinnerElement;

  constructor() {
    this.spinnerElement = Spinner();
  }

  initialize() {
    this.render();
    this.bindEvents();
  }

  render() {
    document.body.appendChild(this.spinnerElement);
  }

  bindEvents() {
    eventEmitter.on("loading:start", () => {
      this.spinnerElement.classList.add("active");
    });

    eventEmitter.on("loading:end", () => {
      this.spinnerElement.classList.remove("active");
    });
  }
}

export default SpinnerController;
