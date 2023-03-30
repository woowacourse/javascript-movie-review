let originalOnLine;

const goOffline = () => {
  cy.log('offline');
  return cy.window({ log: false }).then(win => {
    if (!originalOnLine) {
      originalOnLine = win.navigator.onLine;
    }

    Object.defineProperty(win.navigator.constructor.prototype, 'onLine', {
      get: () => {
        return originalOnLine;
      },
    });

    const isOnline = originalOnLine;
    originalOnLine = false;

    if (isOnline) {
      win.dispatchEvent(new win.Event('offline'));
    }
  });
};

const goOnline = () => {
  cy.log('online');
  return cy.window({ log: false }).then(win => {
    if (!originalOnLine) {
      originalOnLine = win.navigator.onLine;
    }

    Object.defineProperty(win.navigator.constructor.prototype, 'onLine', {
      get: () => {
        return originalOnLine;
      },
    });

    const isOnline = originalOnLine;
    originalOnLine = true;

    if (!isOnline) {
      win.dispatchEvent(new win.Event('online'));
    }
  });
};

describe('영화 리뷰 앱 오프라인일 때 상황 테스트', () => {
  const SITE_URL = 'http://localhost:8080';

  beforeEach(() => {
    cy.visit(SITE_URL);
  });

  it('사용을 하다가 네트워크가 끊기면 에러 메세지를 보여준다.', () => {
    goOffline();

    cy.get('#movie-container-title').should('contain', '인터넷 연결이 끊겼습니다.');
  });
});
