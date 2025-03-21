interface asyncErrorBoundaryParameter {
  asyncFn: () => Promise<void>;
  fallbackComponent: (errorMessage: string) => void;
}

const asyncErrorBoundary = async ({
  asyncFn,
  fallbackComponent,
}: asyncErrorBoundaryParameter) => {
  try {
    await asyncFn();
  } catch (error) {
    if (error instanceof Error) {
      fallbackComponent(error.message);
    }
  }
};

export default asyncErrorBoundary;
