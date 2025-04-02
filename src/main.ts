import App from './App.js';
import Logger from './utils/logger/Logger';

window.addEventListener('load', async () => {
  try {
    const app = new App();
    await app.initialize();
  } catch (error) {
    const logger = Logger.getInstance();
    logger.error('초기 영화 목록 로드 실패:', error as Error);
    logger.error('애플리케이션 초기화 실패:', error as Error);
  }
});
