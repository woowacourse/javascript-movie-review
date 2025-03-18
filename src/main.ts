import Button from "./components/Button.ts";
import Header from "./components/Header.ts";
import Input from "./components/Input.ts";
import NavigationBar from "./components/NavigationBar.ts";

document.addEventListener("DOMContentLoaded", () => {
  const input = Input({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onClick: () => {
      console.log("검색 아이콘 클릭");
    },
  });

  const navigationBar = NavigationBar({ input });
  const header = Header({ navigationBar });

  const wrap = document.querySelector("#wrap");
  wrap?.prepend(header);

  const button = Button({
    text: "더 보기",
    onClick: () => {
      console.log("버튼 클릭");
    },
  });

  // Input 컴포넌트 사용하는 코드
  // const header = document.querySelector(".header");
  // header?.appendChild(input);
  const section = document.querySelector("section");
  section?.appendChild(button);
});
