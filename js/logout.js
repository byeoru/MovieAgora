// localstorage에서 MovieAgora를 삭제해서
// 로그아웃 하는 함수
const logout = () => {
  localStorage.removeItem("MovieAgora");
  location.reload();
};
