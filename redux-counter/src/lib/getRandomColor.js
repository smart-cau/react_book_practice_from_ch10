// 랜덤 색상 생성 함수는 CounterListContainer와 App.js에서 중복되어 사용됨. 따라서 여기로 따로 빼줌.

// 총 13가지 색상 중 랜덤으로 선택하는 함수.
export default function getRandomColor() {
  const colors = [
    "#495057",
    "#f03e3e",
    "#d6336c",
    "#ae3ec9",
    "#7048e8",
    "#4263eb",
    "#1c7cd6",
    "#1098ad",
    "#0ca678",
    "#32b24d",
    "#74b816",
    "#f59f00",
    "#f76707"
  ];

  // 0 ~ 12까지 랜덤 숫자.
  const random = Math.floor(Math.random() * 13);

  // 랜덤색상 반환
  return colors[random];
}
