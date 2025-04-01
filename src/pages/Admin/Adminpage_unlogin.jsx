import React, { useState } from "react";
import "../../css/pages/Adminpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminUserState } from "../../Atoms";
import fetchRequest from "../../fetchConfig";
function Adminpageunlogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ accountId: "", password: "" });
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const setAdminUser = useSetRecoilState(adminUserState);
  const adminUser = useRecoilValue(adminUserState);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const fetchUserInfo = async () => {
    try {
      // /auth/operator/info 엔드포인트로 사용자 정보를 가져온다고 가정
      // 백엔드가 GET인지, credentials가 필요한지 등을 상황에 맞게 설정
      const response = await fetchRequest("/auth/semi/info", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`사용자 정보 조회 실패 (status: ${response.status})`);
      }

      const userData = await response.json();
      console.log("사용자 정보 조회 성공:", userData);
      const adminProfile = {
        acountId: userData.data.accountId || "",
        schoolEmail: userData.data.schoolEmail || "",
        nickname: userData.data.nickname || "",
        role: userData.data.role || "",
        university: userData.data.university || "",
        universityAuth: userData.data.universityAuth || "",
      }
      // 응답 데이터 구조에 맞춰 adminUserState에 저장
      // 여기서는 예시로, userData 구조를 가정
      setAdminUser(adminProfile);
    } catch (error) {
      console.error("사용자 정보 요청 중 에러 발생:", error);
      alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetchRequest(
        "/admin/login",
        {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const statusCode = response.status;
      if (statusCode >= 200 && statusCode < 300) {
        // 여기서만 await response.json()을 안전하게 시도
        const data = await response.json();
        console.log("로그인 성공, data:", data);
        await fetchUserInfo();
        // 필요 시 redirectUrl 처리
        if (data.redirectUrl) {
          console.log(data.redirectUrl)
          console.log("현재 adminUserState:", adminUser);
          window.location.href = data.redirectUrl;
        }
        // 또는 navigate("/somewhere");
      } else {
        alert("로그인 실패: "); // 사용자에게 실패 메시지를 보여줍니다.
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert(
        "로그인 중 오류가 발생했습니다. 자세한 사항은 콘솔을 확인해 주세요."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/assets/admin_page_logo.svg" alt="Logo" className="logo" />
        <h2 className="partners-page">Partners Page</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="accountId"
            placeholder="ID입력"
            className="login-input"
            value={formData.accountId}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="비밀번호 입력"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              id="show-password-checkbox"
              checked={passwordVisible}
              onChange={togglePasswordVisibility}
            />
            <span className="custom-checkbox"></span>
            <span className="checkbox-label">비밀번호 보기</span>
          </label>
          <button type="submit" className="login-button">
            다음으로
          </button>
        </form>
        <div className="links-container">
          <div className="link-row">
            <a href="/adminpage/register" className="login-link">
              가입하기
            </a>
            <a href="#find-id-password" className="login-link">
              | &nbsp;ID/비밀번호 찾기
            </a>
          </div>
          <a href="#contact" className="login-link login-link-contact">
            문의하기
          </a>
        </div>
      </div>
    </div>
  );
}

export default Adminpageunlogin;
