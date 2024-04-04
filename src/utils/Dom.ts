export const Dom = {
  getElement<T extends HTMLElement>($target: HTMLElement | Document, selector: string): T {
    const element: T | null = $target.querySelector<T>(selector);
    if (element === null) {
      throw new Error(`${selector} is not found`);
    }
    return element;
  },
  getElementAll<T extends HTMLElement>($target: HTMLElement | Document, selector: string): NodeListOf<T> {
    const element: NodeListOf<T> | null = $target.querySelectorAll<T>(selector);
    if (element === null) {
      throw new Error(`${selector} is not found`);
    }
    return element;
  },
};
