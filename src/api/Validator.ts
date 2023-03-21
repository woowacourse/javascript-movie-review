export const Validator = {
  status(status: number) {
    switch (status) {
      case 400:
        return false;
      case 401:
        return false;
      case 403:
        return false;
      case 404:
        return false;
      case 405:
        return false;
      case 500:
        return false;
      case 501:
        return false;
    }
    return true;
  },
};
