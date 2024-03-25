export const dom = {
  getElement<T extends HTMLElement>($target: HTMLElement, selector: string) {
    const element: T | null = $target.querySelector<T>(selector);
    if (element === null) {
      throw Error(`${selector} is not found`);
    }
    return element;
  },
};
