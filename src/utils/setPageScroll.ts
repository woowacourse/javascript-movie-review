const setPageScroll = (option: boolean) => {
  if (option) document.body.style.overflowY = "auto";
  else document.body.style.overflowY = "hidden";
};

export default setPageScroll;
