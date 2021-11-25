const API_KEY = "6434c249f9a6bef6cfb5bb4aa624e097";
const TMDB_MAIN_ADDRESS = "api.themoviedb.org";
const LANGUAGE = "ko-KR";

// path parameter, query, 결과 데이터 내부 key 이름을 받아서 value를 반환하는 함수.
const getTmdbData = async (path, query = "", obj_dst = "results") => {
  try {
    // 매개변수로 받은 Path parameter, Query string을 조합한 url에 데이터를 요청한다.
    const response = await axios.get(
      `https://${TMDB_MAIN_ADDRESS}/3${path}?api_key=${API_KEY}${query}`
    );
    // 요청을 성공적으로 처리한 경우
    if (response.status == 200) {
      return obj_dst ? response.data[`${obj_dst}`] : response.data;
    } else {
      alert("데이터를 불러오지 못하였습니다.");
    }
  } catch (e) {
    alert("오류 발생");
  }
};

// 이미지 path를 완전한 url로 만들어 반환한다.
const getImageUrl = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;

// 영화와 관련된 api호출 함수들이 있는 객체이다.
const movie = {
  // id를 받아서 해당 영화의 상세정보를 반환한다.
  getDetail: async (movieId) =>
    await getTmdbData(`/movie/${movieId}`, `&language=${LANGUAGE}`, null),
  // 현대 상영중인 영화들을 반환한다.
  getNowPlaying: async (page = 1) =>
    await getTmdbData(
      "/movie/now_playing",
      `&language=${LANGUAGE}&page=${page}`
    ),
  // 인기 영화들을 반환한다.
  getPopular: async (page = 1) =>
    await getTmdbData(
      "/movie/popular",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  // 평가가 높은 영화들을 반환한다.
  getTopRated: async (page = 1) =>
    await getTmdbData(
      "/movie/top_rated",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  // 곧 개봉하는 영화들를 반환한다.
  getUpComing: async (page = 1) =>
    await getTmdbData(
      "/movie/upcoming",
      `&language=${LANGUAGE}&page=${page}&region=kr`
    ),
  // 매개변수로 받은 장르의 영화들을 반환한다.
  getDiscover: async (genre, page = 1) =>
    await getTmdbData(
      "/discover/movie",
      `&language=${LANGUAGE}&sort_by=popularity.desc
        &include_adult=true&include_video=true&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
    ),
  // 영화 장르 목록들을 반환한다.
  getGenre: async () =>
    await getTmdbData("/genre/movie/list", `&language=${LANGUAGE}`, "genres"),
  // 영화 id로 해당 영화의 포스터path들을 배열로 받아온다음
  // map함수를 써서 각각의 path요소들을 완전한 url로 완성해서 반환한다.
  getPostersUrl: async (movieId) => {
    const posters = await getTmdbData(
      `/movie/${movieId}/images`,
      "",
      "posters"
    );
    const urls = posters.map((poster) => {
      const { file_path } = poster;
      return getImageUrl(file_path);
    });
    return urls;
  },
};

// TV Show와 관련된 api호출 함수들이 있는 객체이다.
const tvShow = {
  // id를 받아서 해당 tv show의 상세정보를 반환한다.
  getDetail: async (tvId) =>
    await getTmdbData(`/tv/${tvId}`, `&language=${LANGUAGE}`, null),
  // 오늘 방영하는 방송들을 반환한다.
  getAiringToday: async (page = 1) =>
    await getTmdbData("/tv/airing_today", `&language=${LANGUAGE}&page=${page}`),
  // 인기 방송들을 반환한다.
  getPopular: async (page = 1) =>
    await getTmdbData("/tv/popular", `&language=${LANGUAGE}&page=${page}`),
  // 평가가 높은 방송들을 반환한다.
  getTopRated: async (page = 1) =>
    await getTmdbData("/tv/top_rated", `&language=${LANGUAGE}&page=${page}`),
  // 매개변수로 받은 장르의 방송들을 반환한다.
  getDiscover: async (genre, page = 1) =>
    await getTmdbData(
      "/discover/tv",
      `&language=${LANGUAGE}&sort_by=popularity.desc
        &include_adult=true&include_video=true&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
    ),
  // tv show 장르 목록들을 반환한다.
  getGenre: async () =>
    await getTmdbData("/genre/tv/list", `&language=${LANGUAGE}`, "genres"),
  // TV Show id로 해당 방송의 포스터path들을 배열로 받아온다음
  // map함수를 써서 각각의 path요소들을 완전한 url로 완성해서 반환한다.
  getPostersUrl: async (tvId) => {
    const posters = await getTmdbData(`/tv/${tvId}/images`, "", "posters");
    const urls = posters.map((poster) => {
      const { file_path } = poster;
      return getImageUrl(file_path);
    });
    return urls;
  },
};

// 현재 트렌드인 TV Show와 영화 api호출 함수들이 있는 객체이다.
const trend = {
  getTrend_tv: async () => await getTmdbData("/trending/tv/week"),
  getTrend_movie: async () => await getTmdbData("/trending/movie/week"),
};
