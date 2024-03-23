import ErrorView from '../components/ErrorView';

const ErrorViewController = {
  showErrorView(error: unknown) {
    if (error instanceof Error) {
      document.querySelector('.movie-list-container')?.remove();
      new ErrorView(error.message);
    }
  },

  removeErrorView() {
    document.querySelector('.error-view')?.remove();
  },
};

export default ErrorViewController;
