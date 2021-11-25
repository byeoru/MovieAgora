const signup = async () => {
  const userEmail = document.getElementById("userEmail").value; //유저 Email 겸 아이디
  const userPwd = document.getElementById("userPwd").value; //유저 비밀번호
  const userPwdch = document.getElementById("userPwdch").value; //유저 비밀번호 일치 확인
  const userName = document.getElementById("userName").value; //유저 이름
  const userGender = document.getElementById("userGender").value; //유저 성별
  const userBirth = document.getElementById("userBirth").value; //유저 생일

  const email_reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일 정규식

  if (userEmail && userPwd && userName) {
    //필수 정보가 있는 경우 (이메일, 비밀번호, 이름)
    if (email_reg.test(userEmail)) {
      //이메일의 형식이 맞는 경우
      if (userPwd.length > 3) {
        //유저의 비밀번호가 4자리 이상인 경우
        if (userPwd === userPwdch) {
          //유저의 비밀번호가 일치할 경우
          if (
            (userBirth.length === 6 && userBirth > 0 && userBirth < 999999) ||
            userBirth === ""
          ) {
            //생년월일이 올바르게 입력된 경우, 입력이 안된 경우
            try {
              const response = await axios.post("../php/signup.php", {
                userEmail,
                userPwd,
                userName,
                userGender,
                userBirth,
              });
              if (response.data) {
                console.log(response.data);
                alert("회원가입에 성공하였습니다.");
                location.replace("../html/login.html");
              } else {
                console.log("입력 실패");
                alert("이미 있는 아이디입니다.");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            //생년월일이 올바르게 입력되지 않은 경우
            console.log("생년월일 X");
            alert("생년월일을 정확하게 입력하세요.");
          }
        } else {
          //유저의 비밀번호가 불일치 할 경우
          console.log("비밀번호 불일치");
          alert("비밀번호가 불일치합니다.");
        }
      } else {
        //유저의 비밀번호가 3자리 이하인 경우
        console.log("비밀번호 3자리 이하");
        alert("비밀번호가 너무 짧습니다.");
      }
    } else {
      //이메일의 형식이 맞지 않는 경우
      console.log("이메일 형식 X");
      alert("이메일의 형식이 맞지 않습니다.");
    }
  } else {
    //필수정보가 없는 경우
    console.log("필수정보 X");
    alert("필수정보를 입력해주세요.");
  }
};
