// 페이지에 trend content들을 추가하는 함수, 콜백함수를 호출해서 결과값으로 배열을 받는다.
// 배열 안의 데이터(영화 or tv show content)들을 순회해서 html tag를 적용시킨 후
// 부모태그에 추가한다.
const displayTrend = async (apiFunction, parentNode, category) => {
  const data = await apiFunction();
  data.forEach((trend) => {
    const { poster_path, id } = trend;
    const link = document.createElement("a");
    // detail page로 가기 위한 a tag 적용 parameter로 해당 content의
    // id와 category를 넣는다.
    link.href = `../html/detail.html?id=${id}&category=${category}`;
    link.className = "trend-content";
    const img = document.createElement("img");
    img.src = getImageUrl(poster_path);
    img.className = "trend-img";
    link.appendChild(img);
    parentNode.appendChild(link);
  });
};

// 영화와 tv show, 각각의 장르를 불러와서 html에 추가하는 함수
const displayGenre = async (apiFunction, parentNode, category) => {
  const genres = await apiFunction();
  genres.forEach((genre) => {
    const { name, id } = genre;
    const link = document.createElement("a");
    link.innerHTML = name;
    // parameter로 name을 넘기기 위해서 '&'를 ',' 로 바꿔준다.
    const formatName = name.replace(" &", ",");
    link.href = `../html/category.html?category=${category}&genreId=${id}&title=${formatName}`;
    parentNode.appendChild(link);
  });
};

// localstorage에서 로그인 여부를 확인한 후
// 로그인, 로그아웃, 마이페이지 display를 조정한다.
const setHeaderBtn = () => {
  // 버튼들을 가져온다.
  const login_button = document.querySelector(".loginButton");
  const logout_button = document.querySelector(".logoutButton");
  const myPage_button = document.querySelector(".myPageButton");
  // 가져온 모든 버튼에 click이벤트 적용
  login_button.addEventListener("click", loginBtnClickHandler);
  logout_button.addEventListener("click", logoutBtnClickHandler);
  myPage_button.addEventListener("click", myPageBtnClickHandler);

  // localstorage에 "MoieAgora"라는 키의 값을 가져온다.
  const myId = localStorage.getItem("MovieAgora");

  // 값이 있으면(로그인 상태면)
  if (myId) {
    // login빼고 나머지 block처리
    logout_button.style.display = "block";
    myPage_button.style.display = "block";
  } else {
    // 로그아웃 상태면
    // login만 block처리
    login_button.style.display = "block";
  }
};

// 로그인 버튼 클릭 함수
const loginBtnClickHandler = () => {
  location.href = "../html/login.html";
};

// 로그아웃 버튼 클릭 함수
const logoutBtnClickHandler = () => {
  logout();
};

// 마이페이지 버튼 클릭 함수
const myPageBtnClickHandler = () => {
  location.href = "../html/myPage.html";
};

// 처음 초기화하는 함수
const init = () => {
  // 동적으로 html tag를 추가하기 위해 부모 tag를 들고온다.
  const trend_tv = document.querySelector(".trend-tv");
  const trend_movie = document.querySelector(".trend-movie");
  const genre_tv = document.querySelector(".genre-tv");
  const genre_movie = document.querySelector(".genre-movie");
  // 로그인, 로그아웃, 마이페이지 버튼 세팅
  setHeaderBtn();
  // 화면에 tv, movie 트렌드 컨텐트들을 추가
  displayTrend(trend.getTrend_tv, trend_tv, category.tv);
  displayTrend(trend.getTrend_movie, trend_movie, category.movie);
  // 화면에 tv, movie 장르 종류 추가
  displayGenre(tvShow.getGenre, genre_tv, category.tv);
  displayGenre(movie.getGenre, genre_movie, category.movie);
};

init();
