const signout = async () => {
  //회원탈퇴
  const userEmail = JSON.parse(localStorage.getItem("MovieAgora")).Email; //로컬 스토리지에 저장된 이메일 가져옮

  if (userEmail) {
    try {
      const response = await axios.post("../php/signout.php", {
        userEmail,
      });
      if (response.data) {
        console.log(response.data); //성공여부을 콘솔에 출력
        localStorage.removeItem("MovieAgora"); //로컬 스토리지 삭제
        window.location.assign("../index.html"); //메인페이지로 이동
      } else {
        console.log("없는 이메일!");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
