import Cookies from "js-cookie";

// baseURL 설정
const baseURL = "http://13.124.46.181:8080";  // 여기에 기본 URL을 설정합니다.

const fetchRequest = async (path, options = {}) => {
  // 기본 URL과 경로 결합
  const url = `${baseURL}${path}`;

  // 요청 옵션에 쿠키에 저장된 세션을 자동으로 포함
  const requestOptions = {
    ...options,
    credentials: 'include', // 쿠키를 자동으로 포함시킴
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      // 응답이 실패한 경우
      const errorData = await response.json();

      // 인증 실패 시 로그인 페이지로 리다이렉트
      if (response.status === 401 && (errorData.code === "SEC-001" || errorData.code === "SEC-002")) {
        Cookies.remove("Authorization"); // 세션 쿠키 삭제
        localStorage.removeItem("token"); // 로컬 스토리지 삭제
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        window.location.href = "/adminpage"; // 로그인 페이지로 리다이렉트
      } else {
        // 그 외의 에러 처리
        handleErrorResponse(response.status, errorData);
      }
      return Promise.reject(new Error(`Error: ${response.status}`));
    }

    return response;
  } catch (error) {
    console.error("Network error or server is down:", error);
    alert("서버에 연결할 수 없습니다. 다시 시도해 주세요.");
    throw error;
  }
};



export default fetchRequest;
