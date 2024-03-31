function validateSelector(selector: string) {
  if (selector === '' || selector === undefined) {
    throw new Error('잘못된 셀렉터 값입니다.');
  }
}

const DOM = {
  $: <T extends Element>(selector: string, target: Element | Document = document) => {
    validateSelector(selector);
    return target.querySelector<T>(selector);
  },
  $$: <T extends Element>(selector: string, target: Element | Document = document) => {
    validateSelector(selector);
    return target.querySelectorAll<T>(selector);
  },
};

export default DOM;
