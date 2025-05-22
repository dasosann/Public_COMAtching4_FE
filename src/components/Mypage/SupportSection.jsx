import React, { useState } from 'react';
import "../../css/components/SupportSection.css";
import { useNavigate } from 'react-router-dom';
import AccountDeleteModal from './AccountDeleteModal';
import fetchRequest from '../../fetchConfig';

const SupportSection = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetchRequest('/auth/user/api/remove', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('공지사항 요청 실패');
            }
            const data = await response.json();
            console.log("탈퇴시 응답", data);
            alert('회원 탈퇴가 완료되었습니다.');
        } catch (err) {
            console.error("탈퇴 중 오류 발생", err);
        } finally {
            setIsModalOpen(false);
        }
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
                <div className='mypage-support-item' onClick={handleOpenModal}>
                    <span>탈퇴하기</span>
                    <img src='../assets/Common/gt.svg' alt='>' />
                </div>
            </div>

            {isModalOpen && (
                <AccountDeleteModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
};

export default SupportSection;