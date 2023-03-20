export const tryCatchWrapper = async (doFunction: () => void, handleError: (errorMessage: string) => void) => {
  try {
    await doFunction();
  } catch (error) {
    if (error instanceof Error) {
      handleError(error.message);
    }
  }
};
