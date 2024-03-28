import createElement from '../../utils/createElement';

const createErrorTitle = (errorStatus: string) => {
  const title = createElement('h2', {
    className: 'error-title',
    textContent: errorStatus,
  });

  return title;
};

const getTargetErrorMessage = (errorStatus: number) => {
  if (errorStatus === 404) {
    return '죄송합니다. 찾을수 없는 페이지에요!';
  }
  if (errorStatus === 503) {
    return '서버와의 연결이 끊겼어요!';
  }

  return '존재하지 않는 주소이거나, 요청하신 페이지의 주소가 변경 되어 찾을 수 없어요!';
};

const createErrorMessage = (errorStatus: number) => {
  return createElement('p', {
    className: 'error-text',
    textContent: getTargetErrorMessage(errorStatus),
  });
};

const createErrorDetail = (errorStatus: number) => {
  const box = createElement('div', { className: 'error-detail-container' });
  const notFoundMessage = createErrorMessage(errorStatus);
  box.appendChild(notFoundMessage);

  return box;
};

const renderHandler = (errorStatus: number) => {
  const errorComponentContainer = createElement('div', {
    className: 'error-container',
  });
  const errorTitle = createErrorTitle(errorStatus.toString());
  const errorDetail = createErrorDetail(errorStatus);
  [errorTitle, errorDetail].forEach((element) => errorComponentContainer.appendChild(element));

  return errorComponentContainer;
};

export default renderHandler;
