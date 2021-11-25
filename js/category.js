const items_container = document.querySelector(".items-container");

// URL파라미터값 저장
const getParam = (param) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

const category_id = parseInt(getParam("category")); // 영화는 0, tv는 1
const sorting_id = parseInt(getParam("sorting")); // 정렬 콘텐츠에만 값이 있음
const genre_id = parseInt(getParam("genreId")); // 장르 id값
const content_title = getParam("title"); // content title

// 카테고리 페이지에서 콘텐츠들을 보여줌
const showData = async (apiFunction) => {
  const contents = await apiFunction();
  // 디테일 페이지로 이동하는 컨텐츠들을 만든다
  contents.forEach((content) => {
    const { poster_path, id } = content;
    const aTag = document.createElement("a");
    aTag.href = `detail.html?id=${id}&category=${category_id}`;
    aTag.className = "content";
    const posterImage = document.createElement("img");
    posterImage.src = getImageUrl(poster_path, 300);
    posterImage.className = "content-img";
    aTag.appendChild(posterImage);
    items_container.appendChild(aTag);
  });
};

// 각 URL파라미터에 맞게 shopData를 호출하여서 컨텐츠들을 생성한다
const showDataCategoryContents = async () => {
  if (sorting_id) {
    // sorting
    if (category_id === category.tv) {
      // tv
      switch (sorting_id) {
        case sorting.airingToday:
          await showData(tvShow.getAiringToday);
          break;
        case sorting.popular:
          await showData(tvShow.getPopular);
          break;
        case sorting.topRated:
          await showData(tvShow.getTopRated);
      }
    } else {
      // movie
      switch (sorting_id) {
        case sorting.nowPlaying:
          await showData(movie.getNowPlaying);
          break;
        case sorting.popular:
          await showData(movie.getPopular);
          break;
        case sorting.topRated:
          await showData(movie.getTopRated);
          break;
        case sorting.upComing:
          await showData(movie.getUpComing);
      }
    }
  } else {
    // 장르 id
    if (category_id === category.tv) {
      await showData(() => tvShow.getDiscover(genre_id));
    } else {
      await showData(() => movie.getDiscover(genre_id));
    }
  }
};
const init = async () => {
  showDataCategoryContents();
};

init();
