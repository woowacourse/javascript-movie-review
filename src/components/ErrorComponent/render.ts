import createElement from '../../utils/createElement';

const createErrorTitle = (errorStatus: string) => {
  const title = createElement('h2', { className: 'error-title', textContent: errorStatus });

  return title;
};

const createErrorMessage = (errorStatus: number) => {
  return createElement('p', {
    className: 'error-text',
    textContent:
      errorStatus === 404
        ? '죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.'
        : '존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.',
  });
};

const createErrorDetail = (errorStatus: number) => {
  const box = createElement('div', { className: 'error-detail-container' });
  const notFoundMessage = createErrorMessage(errorStatus);
  box.appendChild(notFoundMessage);

  return box;
};

const renderHandler = (errorStatus: number) => {
  const errorComponentContainer = createElement('div', { className: 'error-container' });
  const errorTitle = createErrorTitle(errorStatus.toString());
  const errorDetail = createErrorDetail(errorStatus);

  [errorTitle, errorDetail].forEach((element) => errorComponentContainer.appendChild(element));

  return errorComponentContainer;
};

export default renderHandler;
