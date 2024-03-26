function $<T extends Element>(target: string, startDOM: HTMLElement = document.body): T {
  const targetDOM = startDOM.querySelector<T>(target);

  if (targetDOM === null) throw new Error(`${target}에 해당하는 DOM을 찾을 수 없습니다.`);

  return targetDOM;
}

function $$<T extends Element>(target: string, startDOM: HTMLElement = document.body): NodeListOf<T> {
  const targetDOMList = startDOM.querySelectorAll<T>(target);

  if (targetDOMList.length === 0) throw new Error(`${target}에 해당하는 DOM을 찾을 수 없습니다.`);

  return targetDOMList;
}

export { $, $$ };
