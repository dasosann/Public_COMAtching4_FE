import React, { useState } from 'react';
import "../../css/components/SupportSection.css";
import { useNavigate } from 'react-router-dom';
import AccountDeleteModal from './AccountDeleteModal';

const SupportSection = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        // 실제 탈퇴 API 호출 등을 여기에 구현
        alert('회원 탈퇴가 완료되었습니다.');
        setIsModalOpen(false);
        // 예: navigate('/logout') 또는 다른 페이지로 이동
    };

    return (
        <>
            <div className='mypage-support'>
                <p className='mypage-support-title'>고객 지원</p>
                <div className='mypage-support-item' onClick={() => navigate('/search-mylist')}>
                    <span>매칭 내역</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div>
                <div className='mypage-support-item' onClick={() => navigate('/qa')}>
                    <span>Q&A</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div>
                {/* <div className='mypage-support-item'>
                    <span>신고하기</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div> */}
            </div>

            <div className='mypage-etc'>
                <p className='mypage-etc-title'>기타</p>
                <div className='mypage-support-item' onClick={() => navigate('/googleagree')}>
                    <span>이용약관</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div>
                <div className='mypage-support-item' onClick={() => navigate('/matching')}>
                    <span>매칭하기</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div>
                {/* <div className='mypage-support-item' onClick={handleOpenModal}>
                    <span>탈퇴하기</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div> */}
            </div>

            {/* {isModalOpen && (
                <AccountDeleteModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )} */}
        </>
    );
};

export default SupportSection;