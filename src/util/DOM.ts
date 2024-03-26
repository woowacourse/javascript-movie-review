import ToastPopup from '../components/ToastPopup/ToastPopup';

function getDomElement<T extends HTMLElement = HTMLElement>(selector: string, where?: HTMLElement) {
  if (where) {
    const element = where.querySelector(selector);
    if (element === undefined || element === null) {
      ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`);
      setTimeout(() => location.reload(), 3000);
    }
    return element as T;
  }
  const element = document.querySelector(selector);
  if (element === undefined || element === null) {
    ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`);
    setTimeout(() => location.reload(), 3000);
  }
  return element as T;
}

function getAllDomElements<T extends HTMLElement = HTMLElement>(selector: string, where?: HTMLElement) {
  if (where) {
    const elements = where.querySelectorAll(selector);
    if (elements === undefined || elements === null) {
      ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`);
      setTimeout(() => location.reload(), 3000);
    }
    return elements as NodeListOf<T>;
  }
  const element = document.querySelectorAll(selector);
  if (element === undefined || element === null) {
    ToastPopup(`${selector}를 찾을 수 없습니다. 3초 뒤 새로고침됩니다.`);
    setTimeout(() => location.reload(), 3000);
  }
  return element as NodeListOf<T>;
}

export { getDomElement, getAllDomElements };
