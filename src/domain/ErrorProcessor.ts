import { CustomElement } from "../type/componentType";

class ErrorProcessor {
  private subscriber: CustomElement | undefined;

  subscribe(element: CustomElement) {
    this.subscriber = element;
  }

  publish(errorCode: string) {
    this.subscriber?.rerender(errorCode);
  }
}

export default new ErrorProcessor();
