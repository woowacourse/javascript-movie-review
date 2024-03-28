import SearchBoxResponsiveHandler from './SearchBoxResponsiveHandler';

const WindowResponsiveHandler = {
  handleWindowResize() {
    window.addEventListener('resize', () => {
      SearchBoxResponsiveHandler.handleSizeByWIndowSize();
    });
  },
};

export default WindowResponsiveHandler;
