//이메일(아이디)이 입력되었는지 확인하는 메소드
const check_email = () => {
  const email = document.getElementById("userEmail");
  const email_reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일 정규식

  if (email.value !== "") {
    //입력이 된 경우
    if (email_reg.test(email.value)) {
      //이메일의 형식이 맞는 경우
      document.getElementById("help_email").innerHTML = ""; //하단 설명 삭제
    } else {
      //이메일의 형식이 올바르지 않은 경우
      document.getElementById("help_email").innerHTML =
        "정확한 이메일 주소를 입력하세요."; //하단 설명 출력
      document.getElementById("help_email").style.color = "orange";
    }
  } else {
    //미입력 경우
    document.getElementById("help_email").innerHTML = "필수 정보입니다."; //하단 설명 출력
    document.getElementById("help_email").style.color = "orange";
  }
};

//입력중에 비밀번호와 재확인 번호가 일치하는 지를 확인하는 메소드
const check_pw = () => {
  const pw1 = document.getElementById("userPwd");
  const pw2 = document.getElementById("userPwdch");

  if (pw1.value !== "" && pw2.value !== "") {
    if (pw1.value === pw2.value) {
      document.getElementById("pw_same").innerHTML = "비밀번호가 일치합니다.";
      document.getElementById("pw_same").style.color = "green";
      document.getElementById("pwLength").innerHTML = "";
    } else {
      document.getElementById("pw_same").innerHTML =
        "비밀번호가 일치하지 않습니다.";
      document.getElementById("pw_same").style.color = "orange";
    }
  } else {
    document.getElementById("pw_same").innerHTML = "필수 정보입니다.";
    document.getElementById("pwLength").innerHTML = "필수 정보입니다.";
  }

  if (pw1.value.length < 4) {
    document.getElementById("pwLength").innerHTML =
      "4~20자내로 사용가능합니다.";
    document.getElementById("pw_same").innerHTML = "다시 입력해주세요.";
    document.getElementById("pw_same").style.color = "orange";
  }
};

//이름이 입력되었는지 확인하는 메소드
const check_name = () => {
  const name = document.getElementById("userName");

  if (name.value !== "") {
    document.getElementById("help_name").innerHTML = "";
  } else {
    document.getElementById("help_name").innerHTML = "필수 정보입니다.";
    document.getElementById("help_name").style.color = "orange";
  }
};
