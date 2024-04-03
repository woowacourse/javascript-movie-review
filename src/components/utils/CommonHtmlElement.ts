class CommonHtmlElement {
  private $element: HTMLElement;

  constructor(element: HTMLElement | Element | null = null) {
    if (!(element instanceof HTMLElement)) {
      throw new Error(
        "[ERROR] CommonHtmlElement에 HTMLElement이 아닌 인자가 들어왔습니다."
      );
    }

    this.$element = element;
  }

  injectTextContent(textContent: string) {
    this.$element.textContent = textContent;
  }

  removeClassName(className: string) {
    this.$element.classList.remove(className);
  }

  setValue(value: string) {
    if (this.$element instanceof HTMLInputElement) {
      this.$element.value = value;
      return;
    }
    this.$element.setAttribute("value", value);
  }

  setAttribute(qualifiedName: string, value: string) {
    this.$element.setAttribute(qualifiedName, value);
  }
}

export default CommonHtmlElement;
