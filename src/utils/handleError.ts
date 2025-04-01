import ErrorMessage from "../constants/ErrorMessage";

const handleError = (error: unknown, customMessage?: string) => {
  if (error instanceof Error) alert(customMessage ?? error.message);
  else alert(customMessage ?? ErrorMessage.UNKNOWN);
};

export default handleError;
