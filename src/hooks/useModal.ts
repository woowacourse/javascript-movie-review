import useBoolean, { UseBooleanReturn } from "./useBoolean";

const useModal = (initialValue: boolean): UseBooleanReturn => {
  const [isOpen, setIsOpen, setIsClose] = useBoolean(initialValue);

  console.log("isOpen", isOpen);
  const open = () => {
    setIsOpen();
  };

  const close = () => {
    setIsClose();
  };

  return [isOpen, open, close];
};

export default useModal;
