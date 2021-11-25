const login = async () => {
  // DOM 접근용
  const userEmail = document.getElementById("userEmail").value;
  const userPwd = document.getElementById("userPwd").value;

  if (userEmail && userPwd) {
    //필수정보가 있는 경우
    try {
      // response.data는 true 또는 false이다.
      // true: 로그인 성공
      // false: 로그인 실패
      const response = await axios.post("../php/login.php", {
        userEmail,
        userPwd,
      });

      if (response.data) {
        // 로그인 성공 시
        localStorage.setItem(
          "MovieAgora",
          JSON.stringify({
            ID: response.data,
            Email: userEmail,
            Pwd: userPwd,
          })
        ); //로컬 스토리지에 로그인에 성공한 계정 정보를 저장합니다.
        location.assign("../index.html");
        alert("로그인에 성공하였습니다..");
      } else {
        alert("로그인에 실패했습니다."); // 로그인 실패 시
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    //필수정보가 없는 경우
    console.log("필수정보 X");
    alert("필수정보를 입력해주세요.");
  }
};
