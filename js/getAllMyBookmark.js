// 내 북마크를 모두 가져와서 반환하는 함수
const getAllMyBookmark = async () => {
  // 로그인한 계정 ID를 가져온다.
  const userId = JSON.parse(localStorage.getItem("MovieAgora")).ID;
  try {
    // 내 ID로 등록된 모든 북마크를 가져온다.
    const res = await axios.post("../php/getAllMyBookmark.php", { userId });
    if (res.data) {
      return res.data;
    } else {
      alert("북마크를 불러오지 못하였습니다.");
    }
  } catch (e) {
    alert("오류 발생");
  }
};

// 가져온 모든 북마크를 html에 추가하는 함수
const displayAllMyBookmark = async () => {
  const bookmark_container = document.querySelector(".bookmark-container");
  // 중복 추가 방지용
  if (bookmark_container.hasChildNodes()) return;

  const bookmarks = await getAllMyBookmark();
  // 가져온 북마크마다 html tag로 포장해서 부모태그에 추가시킨다.
  bookmarks.forEach((bookmark) => {
    const { categoryId, contentId, contentName } = bookmark;
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `../html/detail.html?id=${contentId}&category=${categoryId}`;
    link.innerHTML = contentName;
    li.appendChild(link);
    bookmark_container.appendChild(li);
  });
};
