import React, { useState } from 'react';
import M from '../../css/components/MasterManageComponentStyle';
import { useNavigate } from 'react-router-dom';
import fetchRequest from '../../fetchConfig';
const MasterManageComponent = () => {
    const navigate= useNavigate();
    const handle1000Button  = async()=>{
        try{
            const data = await fetchRequest('/auth/admin/make1000',{
                method : 'GET',
            });
            console.log("1000원 버튼 응답: ", data);
            alert("1000원 버튼 활성/비활성화 되었습니다.");
        }catch(error){
            console.error("천원 버튼 요청 실패",error);
            alert("천원 버튼 요청에 실패했습니다.");
        }
    }
    return (
        <M.MasterContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/payrequest'))}>
                <M.TitleText>가입자 결제 요청 관리</M.TitleText>
                <M.ContentText>유저 결제 요청 관리</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/search'))}>
                <M.TitleText>가입자 검색 및 관리</M.TitleText>
                <M.ContentText>결제내역 및 포인트 사용내역 열람, 포인트 조정, 블랙리스트 추가</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/gender'))}>
                <M.TitleText>가입자 성비 분석</M.TitleText>
                <M.ContentText>가입자의 성비 분석</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/notice'))}>
                <M.TitleText>공지사항 등록</M.TitleText>
                <M.ContentText>전체알림 공지</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/blacklist'))}>
                <M.TitleText>블랙리스트 확인 및 해제</M.TitleText>
                <M.ContentText>블랙리스트 조회와 해제</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/event'))}>
                <M.TitleText>이벤트 등록</M.TitleText>
                <M.ContentText>관리자의 이벤트 등록</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={()=>(navigate('/adminpage/myPage/Q&A'))}>
                <M.TitleText>문의 및 신고목록</M.TitleText>
                <M.ContentText>가입자로부터 온 문의와 신고 열람</M.ContentText>
            </M.EachContainer>
            <M.EachContainer onClick={handle1000Button}>
                <M.TitleText>1000원 맞추기 버튼</M.TitleText>
                <M.ContentText>코매칭 마지막 날 진행할 유저포인트 천원 버튼 활성화화</M.ContentText>
            </M.EachContainer>
        </M.MasterContainer>
    );
};

export default MasterManageComponent;