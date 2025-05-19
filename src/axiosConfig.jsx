import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend.comatching.site",
  withCredentials: true // ✅ 쿠키 자동 전송
});

// 요청 인터셉터 필요 없음 (쿠키 자동 포함)

// 응답 인터셉터도 쿠키 갱신 로직 제거
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status, data } = error.response || {};
    if (status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/";
    }
    else if(status===302){
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;