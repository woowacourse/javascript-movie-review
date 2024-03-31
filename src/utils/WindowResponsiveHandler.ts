import SearchBoxResponsiveHandler from '../components/searching/SearchBoxResponsiveHandler';

const WindowResponsiveHandler = {
  handleWindowResize() {
    window.addEventListener('resize', () => {
      SearchBoxResponsiveHandler.handleSizeByWIndowSize();
    });
  },
};

export default WindowResponsiveHandler;
