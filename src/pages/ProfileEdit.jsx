import React, { useState ,useEffect} from 'react';
import '../css/pages/profileEdit.css';
import Background from '../components/Background';
import MBTISection from '../components/MBTISection';
import AgeButton from '../components/AgeButton';
import SchoolSelectModal from '../components/SchoolSelectModal.jsx'
import { profileEditState } from '../Atoms.jsx';
import { useRecoilState } from 'recoil';
import InterestSelectModal from '../components/InterestSelectModal.jsx';
import ContactEditModal from '../components/ContactEditModal.jsx';
const ProfileEdit = () => {
  // 프로필 정보 상태 관리
  
  const [profile, setProfile] = useRecoilState(profileEditState);

  const [editingField, setEditingField] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 모달이 열릴 때 스크롤 막기
  useEffect(() => {
    if (isInterestModalOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 막기
    } else {
      document.body.style.overflow = "auto"; // 원래대로 돌리기
    }

    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트가 언마운트되면 복원
    };
  }, [isInterestModalOpen]);

  const handleEditClick = (field) => {
    if (field !== 'school' && field !== 'department') {
      setEditingField(field);
    }
  };

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleBlur = () => {
    setEditingField(null);
  };
  const handleAgeSelection = (value) => {
    setProfile((prev) => ({
      ...prev,
      ageOption: prev.ageOption === value ? "" : value, // 선택 취소 로직
    }));
  };
  
  // MBTI 선택 함수 수정
  const handleMBTISelection = (type) => {
    setProfile((prevProfile) => {
      let newMBTI = prevProfile.selectedMBTIEdit.split(""); // ✅ 문자열을 배열로 변환

      const categoryIndex =
        type === "E" || type === "I" ? 0 :
        type === "S" || type === "N" ? 1 :
        type === "T" || type === "F" ? 2 :
        3;

      // 기존 값과 같은 경우 선택 해제, 아니면 새로운 값으로 변경
      newMBTI[categoryIndex] = newMBTI[categoryIndex] === type ? "X" : type;

      return { 
        ...prevProfile, 
        selectedMBTIEdit: newMBTI.join("").replace(/X/g, '') // ✅ 배열을 다시 문자열로 변환하고 'X' 제거
      };
    });
  };
  
  
  console.log(profile);
  const isFormComplete =
  Object.values(profile).every(value => value !== "") &&
  profile.selectedMBTIEdit.length === 4; // ✅ 문자열 길이로 MBTI 4개 선택 여부 확인


  return (
    <div className="profile-edit-container">
      <Background />
      <div className="profile-edit-header">
        <h2 className="profile-edit-title">프로필 수정</h2>
        <p className="profile-edit-description">
          자신의 프로필을 수정할 수 있어요.<br />
          연락처 등은 신중하게 기입해주세요.
        </p>
      </div>
      <div className="profile-edit-form">
        {/* 닉네임 */}
        <div className="profile-edit-item profile-edit-clickable" onClick={() => handleEditClick('nickname')}>
          <span className="profile-edit-label">닉네임</span>
          {editingField === 'nickname' ? (
            <input
              type="text"
              className="profile-edit-input"
              value={profile.nickname}
              onChange={(e) => handleInputChange(e, 'nickname')}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span className="profile-edit-value">{profile.nickname}</span>
          )}
        </div>

        {/* 나이 */}
        <div className="profile-edit-item profile-edit-clickable" onClick={() => handleEditClick('age')}>
          <span className="profile-edit-label">나이</span>
          {editingField === 'age' ? (
            <input
              type="text"
              className="profile-edit-input"
              value={profile.age}
              onChange={(e) => handleInputChange(e, 'age')}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span className="profile-edit-value">{profile.age}</span>
          )}
        </div>

        {/* 학교 (수정 불가) */}
        <div className="profile-edit-item profile-edit-noneditable">
          <span className="profile-edit-label">학교</span>
          <span className="profile-edit-value profile-edit-no-underline">{profile.school} 
            <img src="/assets/Common/gt.svg" alt="" className='profile-edit-img' 
            onClick={() => setIsModalOpen(true)}
            />
          </span>
        </div>

        {/* 학과 (수정 불가) */}
        <div className="profile-edit-item profile-edit-noneditable">
          <span className="profile-edit-label">학과</span>
          <span className="profile-edit-value profile-edit-no-underline">{profile.department}
            <img src="/assets/Common/gt.svg" alt="" className='profile-edit-img' 
            onClick={() => setIsModalOpen(true)}
            />
          </span>
          
        </div>

        {/* 연락처 */}
        <div className="profile-edit-item profile-edit-noneditable">
          <span className="profile-edit-label">연락처</span>
          <span className="profile-edit-value profile-edit-no-underline">
            {profile.contact_id}
            <img
              src="/assets/Common/gt.svg"
              alt=""
              className="profile-edit-img"
              onClick={() => setIsContactModalOpen(true)}
            />
          </span>
        </div>


        {/* 관심사 */}
        <div className="profile-edit-item profile-edit-noneditable">
          <span className="profile-edit-label">관심사</span>
          <span className="profile-edit-value profile-edit-no-underline">
            {profile.interests.length > 0 ? (
              profile.interests.length > 2 ? (
                // 관심사가 3개 이상인 경우
                `${profile.interests.slice(0, 2).join(", ")} 외 ${profile.interests.length - 2}개`
              ) : (
                // 관심사가 2개 이하인 경우
                profile.interests.join(", ")
              )
            ) : (
              "선택하세요"
            )}
            <img
              src="/assets/Common/gt.svg"
              alt=""
              className="profile-edit-img"
              onClick={() => setIsInterestModalOpen(true)}
            />
          </span>
        </div>


        
        
        <div className="profile-edit-mbti profile-edit-clickable">
          <span className="profile-edit-name">MBTI</span>
          <div className="margin"></div>
          <MBTISection 
            user={profile.selectedMBTIEdit} // 배열을 문자열로 변환
            onClick={handleMBTISelection}
            name="MBTIButton" 
          />

        </div>
        
        <div className="profile-edit-mbti profile-edit-clickable">
          <span className="profile-edit-name">연락빈도</span>
          <div className="margin"></div>
          <div className="profile-edit-button-group">
            <AgeButton
              formData={profile.ageOption}
              value="YOUNGER"
              text="연하"
              onClick={() => handleAgeSelection("YOUNGER", "ageOption")}
              isClickable={true}
            />
            <AgeButton
              formData={profile.ageOption}
              value="EQUAL"
              text="동갑"
              onClick={() => handleAgeSelection("EQUAL", "ageOption")}
              isClickable={true}
            />
            <AgeButton
              formData={profile.ageOption}
              text="연상"
              value="OLDER"
              onClick={() => handleAgeSelection("OLDER", "ageOption")}
              isClickable={true}
            />
          </div>
        </div>
        
        {['favoriteSong', 'introduction'].map((field) => (
          <div key={field} className="profile-edit-item profile-edit-clickable" onClick={() => handleEditClick(field)}>
            <span className="profile-edit-label">{field === 'favoriteSong' ? '좋아하는 노래' : '한줄소개'}</span>
            {editingField === field ? (
              <input
                type="text"
                className="profile-edit-input"
                value={profile[field]}
                onChange={(e) => handleInputChange(e, field)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <span className="profile-edit-value">{profile[field]}</span>
            )}
          </div>
        ))}
      </div>
      {/* 탈퇴하기 버튼 */}
      <div className="profile-edit-footer">
        <button className="profile-delete-button">탈퇴하기</button>
      </div>

      
      <button
        className={`profile-submit-button ${isFormComplete ? 'active' : 'inactive'}`}
        disabled={!isFormComplete}
      >
        수정하기
      </button>
      <SchoolSelectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <InterestSelectModal 
        isOpen={isInterestModalOpen} 
        onClose={() => setIsInterestModalOpen(false)}
        interests={profile.interests}
        setInterests={(newInterests) => setProfile({ ...profile, interests: newInterests })}
      />
      <ContactEditModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />


    </div>
  );
};

export default ProfileEdit;
