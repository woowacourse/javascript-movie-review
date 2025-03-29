import App from './App.js';

window.addEventListener('load', async () => {
  const app = new App();
  await app.initialize();
});
