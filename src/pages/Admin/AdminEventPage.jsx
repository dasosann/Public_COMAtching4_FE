import React, { useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import E from '../../css/pages/Admin/AdminEventPageStyle';
import { useNavigate } from 'react-router-dom';
const AdminEventPage = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    const navigate =useNavigate();
    const [remainingEvents, setRemainingEvents] = useState(3); // 예시로 3회로 설정
    const hearts = [];
    for (let i = 0; i < 4; i++) {
        if (i < remainingEvents) {
            hearts.push(<img key={i} src="/assets/Admin/full-heart.svg" alt="꽉찬 하트" style={{ margin: '0 4px' }} />);
        } else {
            hearts.push(<img key={i} src="/assets/Admin/empty-heart.svg" alt="빈 하트" style={{ margin: '0 4px' }} />);
        }
    }

    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                {/* <AdminDiv style={{cursor:'default'}}>
                    <E.TitleDiv>잔여 이벤트 횟수</E.TitleDiv>
                    <E.SubTitleDiv>잔여 이벤트 횟수는 {remainingEvents}회입니다.</E.SubTitleDiv>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        {hearts}
                    </div>
                </AdminDiv> */}
                <E.FlexWrapper>
                        <AdminDiv onClick={()=>navigate('/adminpage/myPage/event/free-match',{state:{remainingEvents:remainingEvents}})}>
                            <E.TitleDiv>매칭 기회 제공 이벤트</E.TitleDiv> 
                            <E.SubDiv>이벤트 1회당 이성뽑기 1회 상한 존재</E.SubDiv>
                        </AdminDiv>
                        <AdminDiv onClick={()=>navigate('/adminpage/myPage/event/discount',{state:{remainingEvents:remainingEvents}})}>
                            <E.TitleDiv>포인트 충전 할인 이벤트</E.TitleDiv>
                            <E.SubDiv>40%의 할인 상한 존재, 최대 2시간 상한 존재</E.SubDiv>
                        </AdminDiv>
                    </E.FlexWrapper>
                    <E.FlexWrapper>
                        <AdminDiv  onClick={()=>navigate('/adminpage/myPage/event/list')}>
                            <E.TitleDiv>이벤트 예약목록 및 취소</E.TitleDiv>
                            <E.SubDiv>두 이벤트 예약 리스트 통합 예약 내역 및 취소</E.SubDiv>
                        </AdminDiv>
                        <AdminDiv>
                            <E.TitleDiv onClick={()=>navigate('/adminpage/myPage/event/history')}>이벤트 히스토리</E.TitleDiv>
                            <E.SubDiv>지금까지 진행한 과거 이벤트의 히스토리</E.SubDiv>
                        </AdminDiv>
                    </E.FlexWrapper>
            </MainWrapper>
        </div>
    );
};

export default AdminEventPage;