function $<E extends Element>(selector: string, target: E | Document = document): E {
  const element = target.querySelector<E>(selector);

  if (!element) {
    throw new Error(`DOM에 ${selector} 요소가 존재하지 않습니다.`);
  }

  return element;
}

function $$<E extends Element>(selector: string, target: E | Document = document): E[] {
  return Array.from(target.querySelectorAll(selector));
}

export { $, $$ };
