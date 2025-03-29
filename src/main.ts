import App from './App.js';

window.addEventListener('load', async () => {
  try {
    const app = new App();
    await app.initialize();
  } catch (error) {
    console.error('애플리케이션 초기화 실패:', error);
  }
});
