import SearchBoxResponsiveHandler from '../components/searching/SearchBoxResponsiveHandler';

const WindowResponsiveHandler = {
  handleWindowResize() {
    window.addEventListener('resize', () => {
      SearchBoxResponsiveHandler.handleSizeByWindowSize();
    });
  },
};

export default WindowResponsiveHandler;
