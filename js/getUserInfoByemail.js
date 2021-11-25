const getUserInfoByemail = async () => {
  const localData = JSON.parse(localStorage.getItem("MovieAgora"));
  const userEmail = localData.Email; //로컬 스토리지에 저장된 이메일 가져옮
  const userPwd = localData.Pwd; //로컬 스토리에 저장된 비밀번호 가져옮

  if (userEmail) {
    try {
      const response = await axios.post("../php/getUserInfoByemail.php", {
        userEmail,
      });
      if (response.data) {
        //console.log(response.data); //성공여부 확인을 위해 전달된 데이터를 출력
        document.getElementById("userEmail").value = userEmail; //유저 이메일을 클라이언트로 전달
        document.getElementById("userPwd").value = userPwd; //유저 비밀번호을 클라이언트로 전달
        document.getElementById("userPwdch").value = userPwd; //유저 비밀번호 일치 확인을 클라이언트로 전달
        document.getElementById("userName").value = response.data.userName; //유저 이름을 클라이언트로 전달
        document.getElementById("userGender").value = response.data.userGender; //유저 성별을 클라이언트로 전달
        document.getElementById("userBirth").value = response.data.userBirth; //유저 생일을 클라이언트로 전달
      } else {
        console.log("없는 이메일!");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
