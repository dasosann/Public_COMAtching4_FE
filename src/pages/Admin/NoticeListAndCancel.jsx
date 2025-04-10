import React, { useState } from 'react';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import styled from 'styled-components';
import Modal from '../../css/pages/Admin/AdminModalAll';
const L = {};
L.TitleDiv = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
L.RedSpan = styled.span`
    color: #d91329;
`
L.SubTitle = styled.div`
    font-weight: 500;
    font-size: 20px;
    color: #858585;
`
L.FirstDiv = styled.div`
    width: 100%;
    height: 29px;
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    display: flex;
    gap: 32px;
`
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
`
L.SecondDiv = styled.div`
    width: 100%;
    height: 47px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
L.SecondSpan = styled.div`
    color: #4d4d4d;
    font-weight: 500;
    text-align: center;
`
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
`
const EachNoticeComponent = ({data}) =>{
    const [showSecondModal, setShowSecondModal] = useState(false);  // 두 번째 모달 표시 여부
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () =>{
        setShowModal(false)
    }
    const handleFirstModalConfirm = () => {
        setShowModal(false);  // 첫 번째 모달 닫기
        setShowSecondModal(true);  // 두 번째 모달 띄우기
    };
    const handleCloseSecondModal = () => {
        setShowSecondModal(false);
    };
    return(
        <L.ComponentWrapper>
            <L.FirstDiv><span style={{color:'#828282',fontWeight:'500'}}>실행전</span><span>{data.eventType}</span></L.FirstDiv>
            <L.SecondDiv>
                <div style={{display:'flex', gap:'16px'}}><span style={{width:'137px'}}>공지 시작일:</span><L.SecondSpan style={{width:'177px'}}>{data.startDate}</L.SecondSpan></div>
                <div style={{display:'flex', gap:'8px', width:'293px'}}><span style={{width:'96px'}}>시작 시각:</span><L.SecondSpan style={{width:'130px'}}>{data.startTime}</L.SecondSpan></div>
                <div style={{display:'flex', gap:'8px', width:'293px'}}><span style={{width:'107px'}}>종료 시각&nbsp;:</span> <L.SecondSpan style={{width:'151px'}}>{data.endTime}</L.SecondSpan></div>
            </L.SecondDiv>
            <L.Button onClick={()=>setShowModal(true)}>공지 취소</L.Button>
            {showModal && (
                    <Modal.Overlay>
                        <Modal.ModalContainer>
                            <Modal.ModalContent style={{textAlign:'center'}}>이 공지를 정말로 취소하시겠어요? <br/>공지는 다음과 같습니다.<br/>'{data.eventType}'<br/>{data.startDate}, {data.startTime}-{data.endTime}</Modal.ModalContent>
                            <Modal.ModalConfirm >
                                <Modal.ModalConfirmButton onClick={handleCloseModal} style={{ borderRight:'1px solid #b3b3b3'}}>취소</Modal.ModalConfirmButton>
                                <Modal.ModalConfirmButton onClick={handleFirstModalConfirm}>확인</Modal.ModalConfirmButton>
                            </Modal.ModalConfirm>
                        </Modal.ModalContainer>
                    </Modal.Overlay>
                )}
                {showSecondModal && (
                <Modal.Overlay>
                    <Modal.ModalContainer>
                        <Modal.ModalContent style={{letterSpacing:'-0.03em', textAlign:'center'}}>
                            <div style={{width:'343px',height:'87px',display:'flex',alignItems:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>공지 예약이<br/> 성공적으로 취소되었습니다.</div>
                        </Modal.ModalContent>
                        <Modal.ModalConfirm>
                            <Modal.ModalConfirmButton onClick={handleCloseSecondModal}>확인</Modal.ModalConfirmButton>
                        </Modal.ModalConfirm>
                    </Modal.ModalContainer>
                </Modal.Overlay>
                )}
        </L.ComponentWrapper>
    )
}
const NoticeListAndCancel = () => {
    const eventList = [
        {
          eventType: "매칭 기회 제공 이벤트",
          startDate: "2025-04-01",
          startTime: "10:00",
          endTime: "12:00"
        },
        {
          eventType: "할인 이벤트",
          startDate: "2025-05-15",
          startTime: "09:00 AM",
          endTime: "18:00"
        },
        {
          eventType: "특별 프로모션",
          startDate: "2025-06-20",
          startTime: "11:00 AM",
          endTime: "14:00"
        },
        {
          eventType: "회원 전용 이벤트",
          startDate: "2025-07-10",
          startTime: "01:00 PM",
          endTime: "15:00"
        },
        {
          eventType: "회원 전용 이벤트",
          startDate: "2025-07-10",
          startTime: "01:00 PM",
          endTime: "16:00"
        },
        {
          eventType: "회원 전용 이벤트",
          startDate: "2025-07-10",
          startTime: "01:00 PM",
          endTime: "03:00"
        },
        {
          eventType: "회원 전용 이벤트",
          startDate: "2025-07-10",
          startTime: "01:00 PM",
          endTime: "03:00 PM"
        },
      ];
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    
    
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{paddingRight:'24px', height:'530px'}}>
                    <L.TitleDiv>공지사항 예약목록 및 <L.RedSpan>취소</L.RedSpan></L.TitleDiv>
                    <L.SubTitle>예약 공지 관리기능</L.SubTitle>
                    <div style={{maxHeight:'514px', overflowY:'auto'}}>{eventList.map((data,i)=><EachNoticeComponent key={i} data={data}/>)}</div>
                </AdminDiv> 
            </MainWrapper>

        </div>
    );
};

export default NoticeListAndCancel;