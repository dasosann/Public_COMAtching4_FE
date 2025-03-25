import React, { useState } from 'react';
import E from '../../css/pages/Admin/EventFreeMatchStyle';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import Dropdown from '../../components/Admin/AdminDropDown';
import { useLocation, useNavigate } from 'react-router-dom';
import  Modal from '../../css/pages/Admin/AdminModalAll';
const EventDiscount = () => {
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState("선택");
    const [selectedMinutes, setSelectedMinutes] = useState("선택");
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    const [selectedDate, setSelectedDate] = useState("오늘"); // 선택된 날짜 상태 관리
    const [endTime, setEndTime] = useState("선택");
    const [selectedDiscount, setSelectedDiscount] = useState("선택");
    const [endMinutes, setEndMinutes] = useState("선택");
    const [showModal, setShowModal] = useState(false);
    const handleEndTimeSelect = (value) => setEndTime(value);
    const handleEndMinutesSelect = (value) => setEndMinutes(value);
    const handleSelectedDiscount = (value) => setSelectedDiscount(value);
    const location = useLocation();
    const handleTimeSelect = (value) => setSelectedTime(value);
    const [errorMessage, setErrorMessage] = useState(""); 
    const handleMinutesSelect = (value) => setSelectedMinutes(value);
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));
    const percent = Array.from({ length: 4 }, (_, i) => String((i+1) * 10));
    const remainingEvents = location.state ? location.state.remainingEvents : 0;  // 기본값 0 사용
    const hearts = [];
    for (let i = 0; i < 4; i++) {
        if (i < remainingEvents) {
            hearts.push(<img key={i} src="/assets/Admin/full-heart.svg" alt="꽉찬 하트" style={{ margin: '0 4px' }} />);
        } else {
            hearts.push(<img key={i} src="/assets/Admin/empty-heart.svg" alt="빈 하트" style={{ margin: '0 4px' }} />);
        }
    }
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const handleCloseModal = ()=>{
      setShowModal(false)
    }
    function getDurationText() {
        const startHour = parseInt(selectedTime, 10);
        const startMin = parseInt(selectedMinutes, 10);
        const endHour = parseInt(endTime, 10);
        const endMin = parseInt(endMinutes, 10);
      
        // 아직 시간 선택이 제대로 안 된 경우, 혹은 parseInt 실패
        if (
          isNaN(startHour) || isNaN(startMin) ||
          isNaN(endHour) || isNaN(endMin)
        ) {
          return "0시간";
        }
      
        const startTotal = startHour * 60 + startMin; // 시작 시각(분)
        const endTotal = endHour * 60 + endMin;       // 종료 시각(분)
        let diff = endTotal - startTotal;             // 두 시각 차이(분)
      
        // 종료가 시작보다 같거나 이전이면 0시간 처리(혹은 원하는 대로 처리)
        if (diff <= 0) {
          return "0시간";
        }
      
        const hours = Math.floor(diff / 60); // 몇 시간
        const mins = diff % 60;             // 남은 분
      
        // 분이 0보다 크면 "X시간 Y분", 아니면 "X시간"
        if (mins > 0) {
          return `${hours}시간 ${mins}분`;
        } else {
          return `${hours}시간`;
        }
      }
      const handleConfirm = () => {
        // 시간 선택이 올바른지 체크
        const startHour = parseInt(selectedTime, 10);
        const startMin = parseInt(selectedMinutes, 10);
        const endHour = parseInt(endTime, 10);
        const endMin = parseInt(endMinutes, 10);
      
        if (isNaN(startHour) || isNaN(startMin) || isNaN(endHour) || isNaN(endMin)) {
          alert("시간을 올바르게 선택해주세요.");
          return;
        }
        if (selectedDiscount === "선택") {
          alert("할인율을 선택해주세요.");
          return;
        }
      
        const today = new Date();
        let selectedDateObject;
      
        // "오늘", "내일", "모레"에 따라 날짜 계산
        if (selectedDate === "오늘") {
          selectedDateObject = new Date(today); // 오늘 날짜
        } else if (selectedDate === "내일") {
          selectedDateObject = new Date(today);
          selectedDateObject.setDate(today.getDate() + 1); // 내일 날짜
        } else if (selectedDate === "모레") {
          selectedDateObject = new Date(today);
          selectedDateObject.setDate(today.getDate() + 2); // 모레 날짜
        }
      
        // 선택된 시간과 날짜 결합
        selectedDateObject.setHours(startHour, startMin, 0, 0); // 초는 0으로 설정
        const startISOString = new Date(selectedDateObject).toISOString(); // UTC 기준으로 설정
      
        // 한국 시간 (UTC+9) 맞추기
        const timeZoneOffset = 9 * 60 * 60 * 1000; // 한국은 UTC +9 (밀리초 단위)
        const startKoreanTime = new Date(new Date(startISOString).getTime() + timeZoneOffset);
      
        // 종료 시간 계산
        const endDateObject = new Date(selectedDateObject);
        endDateObject.setHours(endHour, endMin, 0, 0); // 종료 시간 설정
        const endISOString = new Date(endDateObject).toISOString(); // UTC 기준으로 설정
      
        // 한국 시간 (UTC+9) 맞추기
        const endKoreanTime = new Date(new Date(endISOString).getTime() + timeZoneOffset);
      
        // UTC+9 시간으로 변환된 ISO 형식의 날짜 문자열
        const formattedStartTime = startKoreanTime.toISOString().slice(0, 19); // "2025-03-25T19:49:41"
        const formattedEndTime = endKoreanTime.toISOString().slice(0, 19); // "2025-03-25T19:49:41"
      
        console.log(formattedStartTime); // "2025-03-25T19:49:41"
        console.log(formattedEndTime); // "2025-03-25T19:49:41"
      
        const eventData = {
          eventType: "DISCOUNT",
          start: formattedStartTime,  // 한국 시간으로 변환된 ISO 시간
          end: formattedEndTime,      // 한국 시간으로 변환된 ISO 시간
          discountRate: selectedDiscount,
        };
      
        // fetch로 데이터 전송
        fetch('/admin/event/register/discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Event created:', data);
            navigate('/adminpage/myPage/event/registercomplete');
          })
          .catch(error => console.error('Error:', error));
      };
      
      


    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{cursor:'default'}}>
                    <E.TitleDiv>포인트 충전 할인 이벤트 예약</E.TitleDiv>
                    <E.SubTitleDiv>현재 잔여 이벤트 횟수는 {remainingEvents}회입니다.</E.SubTitleDiv>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        {hearts}
                    </div>
                </AdminDiv>
                <AdminDiv style={{padding:'24px', cursor:'default'}}>
                    <E.FlexWrapper>
                        {['오늘','내일','모레'].map((date,i)=>(
                            <E.DateButton key={i} isActive={selectedDate===date} onClick={()=>handleDateClick(date)}>
                                {date}
                            </E.DateButton>
                        ))}
                    </E.FlexWrapper>
                    <E.TitleDiv>이벤트 시간설정(최대 2시간)</E.TitleDiv>
                    <E.FlexWrapper style={{marginTop:'8px', marginBottom:'24px'}}>
                        <Dropdown
                            options={hours}
                            selectedValue={selectedTime}
                            onSelect={handleTimeSelect}
                        />
                        <E.HourText>시</E.HourText>
                          <Dropdown
                            options={minutes}
                            selectedValue={selectedMinutes}
                            onSelect={handleMinutesSelect}
                          />
                        <E.HourText style={{justifyContent:'center'}}>분</E.HourText>
                        <E.HourText style={{margin:'0'}}>부터</E.HourText>
                    </E.FlexWrapper>
                    <E.FlexWrapper style={{marginBottom:'24px'}}>
                        <Dropdown
                            options={hours}
                            selectedValue={endTime}
                            onSelect={handleEndTimeSelect}
                        />
                        <E.HourText>시</E.HourText>
                          <Dropdown
                            options={minutes}
                            selectedValue={endMinutes}
                            onSelect={handleEndMinutesSelect}
                          />
                        <E.HourText style={{justifyContent:'center'}}>분</E.HourText>
                        <E.HourText style={{margin:'0'}}>까지</E.HourText>
                    </E.FlexWrapper>
                    <E.DiscountDiv>
                        <div>
                            교내 가입자 전원에게&nbsp;
                            <E.MatchSpan>{getDurationText()}동안 최대 3번 구매 가능한</E.MatchSpan>
                        </div>
                        <E.DiscountSecondDiv>
                        <Dropdown
                            options={percent}
                            selectedValue={selectedDiscount}
                            onSelect={handleSelectedDiscount}
                            height="192px"
                          />
                          <div style={{width:'402px', height:'49px', alignItems:'center' ,display:'flex', marginLeft:'48px'}}>%의&nbsp;<E.MatchSpan>포인트 충전 할인</E.MatchSpan>을 제공합니다.</div>
                        </E.DiscountSecondDiv> 
                    </E.DiscountDiv>
                    <E.ConfirmButton style={{marginTop:'24px', marginLeft:'auto'}} onClick={handleConfirm}>확인</E.ConfirmButton>
                </AdminDiv>
            </MainWrapper>
            {showModal && (
            <Modal.Overlay>
              <Modal.ModalContainer>
                {/* 모달 상단 내용 */}
                <Modal.ModalContent style={{padding : '56px 40px 24px 40px', flexDirection:'column', gap:'8px'}}>
                <img src="/assets/Admin/modal-warn.svg" alt="경고" />
                <Modal.EventTextDiv>{errorMessage}</Modal.EventTextDiv>
                </Modal.ModalContent>
                {/* 모달 하단 버튼 영역 */}
                <Modal.ModalConfirm>
                  {/* 하나의 버튼만 쓰거나, 2개 버튼으로 나눠서 쓰는 등 자유 */}
                  <Modal.ModalConfirmButton onClick={handleCloseModal}>
                    확인
                  </Modal.ModalConfirmButton>
                </Modal.ModalConfirm>
              </Modal.ModalContainer>
            </Modal.Overlay>
            )}
        </div>
    );
};

export default EventDiscount;