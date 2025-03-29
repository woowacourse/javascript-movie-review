export const DEBUG_ERROR = {
  getNoElementMessage: (element: string) => `요소가 존재하지 않습니다 : ${element}`,
  getNoComponentMessage: (component: string) => `컴포넌트가 존재하지 않습니다 : ${component}`,
};

export const DEBUG_ERROR_MESSAGE = {
  NO_DATA: '데이터가 존재하지 않습니다',
  NO_EVENT_TARGET: '이벤트 타깃이 존재하지 않습니다.',
  NO_HTML_ELEMENT: '이벤트 타겟이 HTMLElement가 아닙니다.',
};
