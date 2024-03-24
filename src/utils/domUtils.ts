/**
 * querySelector의 단축 함수다. 선택된 요소가 없을 경우 null을 반환하거나, 옵션에 따라 에러를 발생시킨다.
 * @param selector - 선택할 요소의 CSS 선택자
 * @param scope - 검색 범위를 지정하는 요소 (Default: document)
 * @param canNull - 선택된 요소가 없을 경우 null 반환 여부 (Default: false)
 * @returns 선택된 요소를 반환한다. 요소가 없으면 null을 반환하거나, throwError가 true면 에러를 발생시킨다.
 * @throws Error - throwError가 true이고 선택된 요소가 없을 경우 에러를 발생시킨다.
 */
export const $ = (selector: string, scope: Document | Element = document, canNull = false) => {
  const element = scope.querySelector(selector);

  if (!canNull && !element) {
    throw new Error('No element matches the selector:' + selector);
  }

  return element;
};

/**
 * querySelectorAll의 단축 함수다. 선택된 요소가 없을 경우 빈 NodeList를 반환하거나, 옵션에 따라 에러를 발생시킨다.
 * @param selector - 선택할 요소의 CSS 선택자
 * @param scope - 검색 범위를 지정하는 요소 (Default: document)
 * @param throwError - 선택된 요소가 없을 경우 에러를 발생시킬지 여부
 * @returns 선택된 요소의 NodeList를 반환한다. 만약 선택된 요소가 없다면, 빈 NodeList를 반환하거나 throwError가 true면 에러를 발생시킨다.
 * @throws Error - throwError가 true이고 선택된 요소가 없을 경우 에러를 발생시킨다.
 */
export const $$ = (selector: string, scope: Document | Element = document, throwError = false) => {
  const elements = scope.querySelectorAll(selector);

  if (throwError && elements.length === 0) {
    throw new Error('No elements match the selector:' + selector);
  }

  return elements;
};

/**
 * 주어진 속성 객체를 HTML 요소에 적용하는 함수다.
 * @param element HTML 요소
 * @param attributes 요소에 적용할 속성들이 담긴 객체
 */
export const setAttributes = (element: HTMLElement, attributes: { [key: string]: string }): void => {
  Object.keys(attributes).forEach((key) => {
    if (key === 'text') {
      /* 요소의 속성을 변경하는 모듈이므로, 다음 규칙을 비활성화한다. */
      // eslint-disable-next-line no-param-reassign
      element.innerText = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });
};

/**
 * 부모 요소들을 순차적으로 서로의 자식으로 추가하고, 마지막 부모요소에 여러 자식 요소들을 추가한다.
 * @param parents - 자식 요소들을 추가할 부모 요소 또는 부모 요소들의 배열
 * @param children - 추가할 자식 요소들의 배열
 */
export const appendChildren = (parents: Element | Element[], children: Element[]): void => {
  const parentsArray = Array.isArray(parents) ? parents : [parents];

  parentsArray.reduce((prevParent, currentParent) => {
    prevParent.appendChild(currentParent);
    return currentParent;
  });

  children.forEach((child) => parentsArray[parentsArray.length - 1].appendChild(child));
};
