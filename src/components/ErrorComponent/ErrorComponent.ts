import renderHandler from './render';

function ErrorComponent(errorStatus: number) {
  const errorComponent = renderHandler(errorStatus);

  return errorComponent;
}

export default ErrorComponent;
