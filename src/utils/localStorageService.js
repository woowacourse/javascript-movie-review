const localStorageService  = {
  getValue(key){
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  setValue(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default localStorageService;
