import React, { useEffect, useRef, useState } from 'react';
import '../css/components/PointBalance.css';
import { useLocation, useNavigate } from 'react-router-dom';
import MainPaymentModal from './MainPaymentModal';
import fetchRequest from '../fetchConfig';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';
import { PaymentSuccessModal, WrongRequestModal } from './AfterPaymentModal';
import { userState } from '../Atoms';
import { useRecoilState } from 'recoil';

const PointBalance = () => {
    const hasSent = useRef(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [amount, setAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ point: 0, realName: null });

    const fetchUserPoints = async () => {
        try {
            const response = await fetchRequest('/auth/user/api/points', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setUserInfo( ({
                    point: data.data.point || 0,
                    realName: data.data.realName || null,
                }));
            } else {
                console.error('포인트 조회 실패');
            }
        } catch (error) {
            console.error('포인트 조회 중 오류:', error);
        }
    };

    const handleNotService = () => {
        alert('해당 서비스는 5/21일 10:00에 오픈됩니다 축제까지 기다려주세요!');
    };

    useEffect(() => {
        fetchUserPoints();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseResultModal = () => {
        setPaymentStatus(null);
    };

    return (
        <div>
            <div className="point-balance">
                <div className="left-section">
                    <img src="/assets/point.svg" alt="Point Icon" className="point-icon" />
                    <span className="point-text">보유 포인트</span>
                    <span className="amount">{userInfo.point} P</span>
                </div>
                <button className="charges-button" onClick={openModal}>
                    충전하기
                </button>
            </div>

            <MainPaymentModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
                amount={amount}
                userInfo={userInfo}
            />

            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <ClipLoader size={80} color="#ffffff" />
                </div>
            )}

            {/* {paymentStatus === 'success' && (
                <PaymentSuccessModal onClose={handleCloseResultModal} amount={amount} />
            )}

            {paymentStatus === 'fail' && (
                <WrongRequestModal onClose={handleCloseResultModal} />
            )} */}
        </div>
    );
};

export default PointBalance;