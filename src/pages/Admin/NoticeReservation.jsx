import React, { useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import E from '../../css/pages/Admin/EventFreeMatchStyle';
import Modal from '../../css/pages/Admin/AdminModalAll';
import Dropdown from '../../components/Admin/AdminDropDown';

const NoticeReservation = () => {
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState("선택");
    const [selectedMinutes, setSelectedMinutes] = useState("선택");
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    const [selectedDate, setSelectedDate] = useState("오늘");
    const [endTime, setEndTime] = useState("선택");
    const [endMinutes, setEndMinutes] = useState("선택");
    const [showModal, setShowModal] = useState(false);
    const handleEndTimeSelect = (value) => setEndTime(value);
    const handleEndMinutesSelect = (value) => setEndMinutes(value);
    const location = useLocation();
    const handleTimeSelect = (value) => setSelectedTime(value);
    const [errorMessage, setErrorMessage] = useState("");
    const handleMinutesSelect = (value) => setSelectedMinutes(value);
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

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

        const startTotal = startHour * 60 + startMin;
        const endTotal = endHour * 60 + endMin;

        if (selectedDate === "오늘") {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTotal = currentHour * 60 + currentMinute;
            const minAllowedStartTotal = currentTotal + 10; // 현재 시간 + 10분

            // 현재 시간보다 이전이거나 10분 이내인지 확인
            if (startTotal < minAllowedStartTotal) {
                setErrorMessage(
                    <>
                        공지사항 시작 시각은 현재 시각보다 <br />
                        최소 10분 이후로 설정해야 합니다.
                    </>
                );
                setShowModal(true);
                return;
            }
        }

        // 시작 시간이 종료 시간보다 같거나 늦을 수 없도록 체크
        if (startTotal >= endTotal) {
            setErrorMessage(
                <>
                    시작 시간이 종료 시간보다 <br /> 같거나 늦을 수 없습니다.
                </>
            );
            setShowModal(true);
            return;
        }

        // 선택된 날짜와 시간 결합
        const today = new Date();
        let selectedDateObject;

        if (selectedDate === "오늘") {
            selectedDateObject = new Date(today);
        } else if (selectedDate === "내일") {
            selectedDateObject = new Date(today);
            selectedDateObject.setDate(today.getDate() + 1);
        } else if (selectedDate === "모레") {
            selectedDateObject = new Date(today);
            selectedDateObject.setDate(today.getDate() + 2);
        }

        selectedDateObject.setHours(startHour, startMin, 0, 0);
        const startISOString = new Date(selectedDateObject).toISOString();

        // 한국 시간 (UTC+9) 맞추기
        const timeZoneOffset = 9 * 60 * 60 * 1000;
        const startKoreanTime = new Date(new Date(startISOString).getTime() + timeZoneOffset);

        // 종료 시간 계산
        const endDateObject = new Date(selectedDateObject);
        endDateObject.setHours(endHour, endMin, 0, 0);
        const endISOString = new Date(endDateObject).toISOString();

        // 한국 시간 (UTC+9) 맞추기
        const endKoreanTime = new Date(new Date(endISOString).getTime() + timeZoneOffset);

        // UTC+9 시간으로 변환된 ISO 형식의 날짜 문자열
        const formattedStartTime = startKoreanTime.toISOString().slice(0, 19);
        const formattedEndTime = endKoreanTime.toISOString().slice(0, 19);

        console.log(formattedStartTime);
        console.log(formattedEndTime);

        navigate("/adminpage/myPage/notice/complete");
    };

    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{ cursor: 'default', paddingTop: '26px', paddingRight: '24px' }}>
                    <E.TitleDiv>공지사항 등록</E.TitleDiv>
                    <E.SubTitleDiv>아래에 공지 내용을 입력해주세요.</E.SubTitleDiv>
                    <E.NoticeInput />
                </AdminDiv>
                <AdminDiv style={{ padding: '24px', cursor: 'default' }}>
                    <E.FlexWrapper>
                        {['오늘', '내일', '모레'].map((date, i) => (
                            <E.DateButton key={i} isActive={selectedDate === date} onClick={() => handleDateClick(date)}>
                                {date}
                            </E.DateButton>
                        ))}
                    </E.FlexWrapper>
                    <E.TitleDiv>공지 시간설정</E.TitleDiv>
                    <E.FlexWrapper style={{ marginTop: '8px', marginBottom: '24px' }}>
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
                        <E.HourText style={{ justifyContent: 'center' }}>분</E.HourText>
                        <E.HourText style={{ margin: '0' }}>부터</E.HourText>
                    </E.FlexWrapper>
                    <E.FlexWrapper style={{ marginBottom: '24px' }}>
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
                        <E.HourText style={{ justifyContent: 'center' }}>분</E.HourText>
                        <E.HourText style={{ margin: '0' }}>까지</E.HourText>
                    </E.FlexWrapper>
                    <E.MatchText>
                        <div>
                            교내 가입자 전체에게 팝업 형태로 공지합니다.
                        </div>
                        <E.ConfirmButton onClick={handleConfirm}>확인</E.ConfirmButton>
                    </E.MatchText>
                </AdminDiv>
            </MainWrapper>
            {showModal && (
                <Modal.Overlay>
                    <Modal.ModalContainer>
                        <Modal.ModalContent style={{ padding: '56px 40px 24px 40px', flexDirection: 'column', gap: '8px' }}>
                            <img src="/assets/Admin/modal-warn.svg" alt="경고" />
                            <Modal.EventTextDiv>{errorMessage}</Modal.EventTextDiv>
                        </Modal.ModalContent>
                        <Modal.ModalConfirm>
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

export default NoticeReservation;