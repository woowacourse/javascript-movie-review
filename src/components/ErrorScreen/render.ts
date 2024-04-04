import createElement from '../../utils/createElement';

const ERROR_MESSAGES = {
  NOT_FOUND_MESSAGE: '죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.',
  INSTRUCTION_MESSAGE: '존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.',
};

const createErrorTitle = (errorStatus: string) => {
  const title = createElement('h1', { className: 'error-title', textContent: errorStatus });

  return title;
};

const createErrorMessagesElements = (): HTMLElement[] => {
  return Object.values(ERROR_MESSAGES).map((message) =>
    createElement('p', {
      className: 'error-text',
      textContent: message,
    }),
  );
};

const createErrorDetail = () => {
  const box = createElement('div', { className: 'error-detail-container' });

  createErrorMessagesElements().forEach((htmlElement) => {
    box.appendChild(htmlElement);
  });

  return box;
};

const renderHandler = (errorStatus: number) => {
  const errorComponentContainer = createElement('div', { className: 'error-container' });
  const errorTitle = createErrorTitle(errorStatus.toString());
  const errorDetail = createErrorDetail();

  [errorTitle, errorDetail].forEach((element) => errorComponentContainer.appendChild(element));

  return errorComponentContainer;
};

export default renderHandler;
