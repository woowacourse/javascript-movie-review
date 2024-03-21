import renderHandler from './render';

function Error(errorStatus: number) {
  const errorComponent = renderHandler(errorStatus);

  return errorComponent;
}

export default Error;
