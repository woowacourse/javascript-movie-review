import createElement from '../../utils/createElement';

const createErrorTitle = (errorStatus: string) => {
  const title = createElement('h1', { className: 'error-title', textContent: errorStatus });

  return title;
};

const createNotFoundMessage = () => {
  return createElement('p', {
    className: 'error-text',
    textContent: '죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.',
  });
};

const createInstructionMessage = () => {
  return createElement('p', {
    className: 'error-text',
    textContent: '존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.',
  });
};

const createErrorDetail = () => {
  const box = createElement('div', { className: 'error-detail-container' });
  const notFoundMessage = createNotFoundMessage();
  const instructionMessage = createInstructionMessage();
  [notFoundMessage, instructionMessage].forEach((element) => {
    box.appendChild(element);
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
