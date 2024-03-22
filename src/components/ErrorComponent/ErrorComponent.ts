import renderHandler from './render';

function ErrorComponent(errorStatus: number) {
  console.log('ErrorComponent :', errorStatus);
  const errorComponent = renderHandler(errorStatus);

  return errorComponent;
}

export default ErrorComponent;
