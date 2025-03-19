import Header from './component/header/Header.ts';
import Footer from './component/footer/Footer.ts';
import MainBanner from './component/main-banner/MainBanner.ts';
//title, imgUrl, score
addEventListener('load', () => {
  const body = document.querySelector('body');

  const testData: MovieData = {
    title: '테스트 타이틀',
    imgUrl: '/image.png',
    score: 4.5,
  };

  const header = new Header();
  const footer = new Footer();
  const mainBanner = new MainBanner({ data: testData });

  if (header.element && footer.element && mainBanner.element) {
    body?.appendChild(header.element);
    body?.appendChild(footer.element);
    body?.appendChild(mainBanner.element);
  }
});
