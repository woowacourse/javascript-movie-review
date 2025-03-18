import Header from "./components/header/Header";

const App = () => {
  // 얘의 역할 최상위 컴포넌트
  // 모든 컴포넌트의 부모
  //영화리스트 전체를 GET해와서 Header에 영화 하나 뿌려야 댐.
  const data = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  };
  data();
  return `
    ${Header({ rate: 9.5, title: "인사이드 아웃2" })}
  `;
};

export default App;
