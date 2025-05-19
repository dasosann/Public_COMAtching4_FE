import React, { useEffect, useState } from 'react';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import styled from 'styled-components';
import Modal from '../../css/pages/Admin/AdminModalAll';
import fetchRequest from '../../fetchConfig';

const L = {};
L.TitleDiv = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`;
L.RedSpan = styled.span`
    color: #d91329;
`;
L.SubTitle = styled.div`
    font-weight: 500;
    font-size: 20px;
    color: #858585;
`;
L.FirstDiv = styled.div`
    width: 100%;
    height: 29px;
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    display: flex;
    gap: 32px;
`;
L.ComponentWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 188px;
    padding: 24px 0px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 1px solid #808080;
    cursor: default;
`;
L.SecondDiv = styled.div`
    width: 100%;
    height: 47px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
L.SecondSpan = styled.div`
    color: #4d4d4d;
    font-weight: 500;
    text-align: center;
`;
L.Button = styled.button`
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    width: 120px;
    height: 48px;
    border-radius: 8px;
    background-color: #dd272a;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin-left: auto;
    padding: 12px 0px;
`;

const EachNoticeComponent = ({ data, onDelete }) => {
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const handleFirstModalConfirm = async () => {
        try {
            console.log(data.id)
            const response = await fetchRequest(`/auth/admin/notice?id=${data.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });
            const content =await response.json();
            console.log("json화 한 삭제 응답",content);
            if (content.code==="GEN-000") {
                setShowModal(false);
                setShowSecondModal(true);
                onDelete(data.id); // 성공 시 목록 갱신
                alert("공지가 삭제되었습니다.");
            } else {
                alert('공지 삭제 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('공지 삭제 요청 중 오류:', error);
            alert('공지 삭제 중 통신 오류가 발생했습니다.');
        }
    };

    const handleCloseSecondModal = () => {
        setShowSecondModal(false);
    };

    return (
        <L.ComponentWrapper>
            <L.FirstDiv>
                <span style={{ color: '#828282', fontWeight: '500' }}>실행전</span>
                <span>{data.title || '알 수 없음'}</span>
            </L.FirstDiv>
            <L.SecondDiv>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ width: '137px' }}>공지 시작일:</span>
                    <L.SecondSpan style={{ width: '177px' }}>{data.startDate || 'N/A'}</L.SecondSpan>
                </div>
                <div style={{ display: 'flex', gap: '8px', width: '293px' }}>
                    <span style={{ width: '96px' }}>시작 시각:</span>
                    <L.SecondSpan style={{ width: '130px' }}>{data.startTime || 'N/A'}</L.SecondSpan>
                </div>
                <div style={{ display: 'flex', gap: '8px', width: '293px' }}>
                    <span style={{ width: '107px' }}>종료 시각 :</span>
                    <L.SecondSpan style={{ width: '151px' }}>{data.endTime || 'N/A'}</L.SecondSpan>
                </div>
            </L.SecondDiv>
            <L.Button onClick={() => setShowModal(true)}>공지 취소</L.Button>
            {showModal && (
                <Modal.Overlay>
                    <Modal.ModalContainer>
                        <Modal.ModalContent style={{ textAlign: 'center' }}>
                            이 공지를 정말로 취소하시겠어요? <br />
                            공지는 다음과 같습니다.<br />
                            {"'" + (data.title || '알 수 없음') + "'"}<br />
                            {data.startDate || 'N/A'}, {data.startTime || 'N/A'}-{data.endTime || 'N/A'}
                        </Modal.ModalContent>
                        <Modal.ModalConfirm>
                            <Modal.ModalConfirmButton
                                onClick={handleCloseModal}
                                style={{ borderRight: '1px solid #b3b3b3' }}
                            >
                                취소
                            </Modal.ModalConfirmButton>
                            <Modal.ModalConfirmButton onClick={handleFirstModalConfirm}>
                                확인
                            </Modal.ModalConfirmButton>
                        </Modal.ModalConfirm>
                    </Modal.ModalContainer>
                </Modal.Overlay>
            )}
            {showSecondModal && (
                <Modal.Overlay>
                    <Modal.ModalContainer>
                        <Modal.ModalContent style={{ letterSpacing: '-0.03em', textAlign: 'center' }}>
                            <div
                                style={{
                                    width: '343px',
                                    height: '87px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                공지 예약이<br /> 성공적으로 취소되었습니다.
                            </div>
                        </Modal.ModalContent>
                        <Modal.ModalConfirm>
                            <Modal.ModalConfirmButton onClick={handleCloseSecondModal}>
                                확인
                            </Modal.ModalConfirmButton>
                        </Modal.ModalConfirm>
                    </Modal.ModalContainer>
                </Modal.Overlay>
            )}
        </L.ComponentWrapper>
    );
};

const NoticeListAndCancel = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    const [noticeList, setNoticeList] = useState([]);

    const getNoticeList = async () => {
        try {
            const response = await fetchRequest(`/auth/admin/notice?state=OPEN`, {
                method: 'GET',
            });
            console.log('Response Status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('받아온 공지사항 리스트', data);
                // Map backend response to match expected structure
                const mappedData = data.data.map(item => ({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    startDate: item.postedAt.split('T')[0], // e.g., "2025-05-14"
                    startTime: item.postedAt.split('T')[1].slice(0, 5), // e.g., "17:04"
                    endTime: item.closedAt.split('T')[1].slice(0, 5), // e.g., "17:04"
                }));
                setNoticeList(mappedData);
            } else {
                const text = await response.text();
                console.error('Error Response:', response.status, text);
                alert('공지사항 불러오는 중 통신 오류 발생 로그를 확인해주세요');
            }
        } catch (error) {
            console.error('공지사항 요청 중 오류', error);
            alert('공지사항 불러오는 중 통신 오류 발생 로그를 확인해주세요');
        }
    };

    const handleDelete = (id) => {
        setNoticeList(prevList => prevList.filter(item => item.id !== id));
    };

    useEffect(() => {
        getNoticeList();
    }, []);

    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{ paddingRight: '24px', height: '530px', justifyContent: 'start' }}>
                    <L.TitleDiv>
                        공지사항 예약목록 및 <L.RedSpan>취소</L.RedSpan>
                    </L.TitleDiv>
                    <L.SubTitle>예약 공지 관리기능</L.SubTitle>
                    <div style={{ maxHeight: '514px', overflowY: 'auto' }}>
                        {noticeList.length > 0 ? (
                            noticeList.map((data, i) => (
                                <EachNoticeComponent key={data.id || i} data={data} onDelete={handleDelete} />
                            ))
                        ) : (
                            <div style={{ fontSize: '24px', marginTop: '30px' }}>
                                예약된 공지사항이 없습니다.
                            </div>
                        )}
                    </div>
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default NoticeListAndCancel;