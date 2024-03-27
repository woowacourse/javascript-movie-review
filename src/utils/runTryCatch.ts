interface RunTryCatchProps<T, U> {
  tryBlock: () => Promise<T>;
  catchBlock: (error: unknown) => U;
}

export const runAsyncTryCatch = async <T, U>({
  tryBlock,
  catchBlock,
}: RunTryCatchProps<T, U>) => {
  try {
    return await tryBlock();
  } catch (error) {
    return catchBlock(error);
  }
};
