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
    const [errorMessage, setErrorMessage] = useState("");
    // 새로운 상태 추가: 제목과 내용
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleEndTimeSelect = (value) => setEndTime(value);
    const handleEndMinutesSelect = (value) => setEndMinutes(value);
    const location = useLocation();
    const handleTimeSelect = (value) => setSelectedTime(value);
    const handleMinutesSelect = (value) => setSelectedMinutes(value);
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirm = async () => {
        // 제목 또는 내용이 비어 있는지 확인
        if (!title.trim() || !content.trim()) {
            setErrorMessage(
                <>
                    공지사항 제목과 내용을 <br /> 모두 입력해주세요.
                </>
            );
            setShowModal(true);
            return;
        }

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
            const minAllowedStartTotal = currentTotal + 10;

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

        if (startTotal >= endTotal) {
            setErrorMessage(
                <>
                    시작 시간이 종료 시간보다 <br /> 같거나 늦을 수 없습니다.
                </>
            );
            setShowModal(true);
            return;
        }

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

        const timeZoneOffset = 9 * 60 * 60 * 1000;
        const startKoreanTime = new Date(new Date(startISOString).getTime() + timeZoneOffset);

        const endDateObject = new Date(selectedDateObject);
        endDateObject.setHours(endHour, endMin, 0, 0);
        const endISOString = new Date(endDateObject).toISOString();

        const endKoreanTime = new Date(new Date(endISOString).getTime() + timeZoneOffset);

        const formattedStartTime = startKoreanTime.toISOString().slice(0, 19);
        const formattedEndTime = endKoreanTime.toISOString().slice(0, 19);

        // 백엔드로 전송할 데이터 구성
        const noticeData = {
            title: title,
            content: content,
            postedAt: formattedStartTime,
            closedAt: formattedEndTime,
        };
        console.log("백엔드로 보내는 데이터 로그", noticeData)
        try {
            const response = await fetch('/auth/admin/notice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticeData),
            });

            if (!response.ok) {
                throw new Error('공지사항 등록에 실패했습니다.');
            }

            const data = await response.json();
            console.log('공지사항 등록 성공:', data);
            navigate("/adminpage/myPage/notice/complete");
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(
                <>
                    공지사항 등록 중 오류가 발생했습니다. <br />
                    다시 시도해주세요.
                </>
            );
            setShowModal(true);
        }
    };

    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper style={{ flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 444 ,minWidth:'534px' }}>
                    <AdminDiv style={{ cursor: 'default', paddingTop: '26px', paddingRight: '24px' }}>
                        <E.TitleDiv>공지사항 제목 등록</E.TitleDiv>
                        <E.SubTitleDiv>아래에 공지사항 제목을 입력해주세요.</E.SubTitleDiv>
                        <E.NoticeInput
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </AdminDiv>
                    <AdminDiv style={{ cursor: 'default', paddingRight: '24px' }}>
                        <E.TitleDiv>내용 등록</E.TitleDiv>
                        <E.SubTitleDiv>아래에 공지사항 내용을 입력하세요.</E.SubTitleDiv>
                        <E.ContentInput
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                        />
                    </AdminDiv>
                </div>
                <AdminDiv style={{ padding: '82px 24px', cursor: 'default', flex: 619 }}>
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