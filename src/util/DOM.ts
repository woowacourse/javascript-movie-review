import ToastPopup from '../components/ToastPopup/ToastPopup';

function getDomElement<T extends HTMLElement = HTMLElement>(selector: string, where?: HTMLElement): T {
  try {
    const element = where ? where.querySelector(selector) : document.querySelector(selector);
    if (!element) {
      throw new Error();
    }
    return element as T;
  } catch (error) {
    ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`, 2500);
    setTimeout(() => location.reload(), 3000);
    throw error;
  }
}

function getAllDomElements<T extends HTMLElement = HTMLElement>(selector: string, where?: HTMLElement): NodeListOf<T> {
  try {
    const elements = where ? where.querySelectorAll(selector) : document.querySelectorAll(selector);
    if (!elements || elements.length === 0) {
      throw new Error();
    }
    return elements as NodeListOf<T>;
  } catch (error) {
    ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`, 2500);
    setTimeout(() => location.reload(), 3000);
    throw error;
  }
}

export { getDomElement, getAllDomElements };
