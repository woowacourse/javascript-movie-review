const logBanana = () => {
  console.log("바나나");
};
const logApple = () => {
  setTimeout(() => {
    console.log("사과");
  }, 1000);
};
const logOrange = () => {
  console.log("오렌지");
};

logBanana();
logApple();
logOrange();
