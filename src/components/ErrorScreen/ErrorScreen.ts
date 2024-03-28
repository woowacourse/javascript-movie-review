import renderHandler from './render';

function ErrorScreen(errorStatus: number) {
  const errorComponent = renderHandler(errorStatus);

  return errorComponent;
}

export default ErrorScreen;
