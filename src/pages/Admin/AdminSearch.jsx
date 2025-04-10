import React, { useEffect, useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import S from '../../css/pages/Admin/AdminSearch';
import {AdminMyPageMain,AdminMyPageManage, AdminTeamManage} from '../../components/Admin/AdminMyPageMain';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchRequest from '../../fetchConfig';
import Spinner from '../../components/Admin/Spinner';
const SearchUserComponent = ({nickname,email,uuid})=>{
  const navigate = useNavigate();
  return(
    <S.UserComponentWrapper>
      <S.NickNameDiv>
        <div><S.TitleSpan>Nickname :</S.TitleSpan><S.NameSpan>&nbsp;{nickname}</S.NameSpan></div>
      </S.NickNameDiv>
      <S.EmailDiv>
          <div>
            <S.TitleSpan>E-mail :</S.TitleSpan>
            <S.EmailSpan>&nbsp;{email}</S.EmailSpan>
          </div>
          <S.DetailButton onClick={()=>navigate(`/adminpage/user/${uuid}`, {
            state: {nickname,email}
          })}>상세정보 보기</S.DetailButton>
      </S.EmailDiv>
    </S.UserComponentWrapper>
  )
}
const Pagination = ({totalPage,currentPage,onPageChange})=>{
  const pagePerGroup=10;
  const currentGroup = Math.floor((currentPage-1)/pagePerGroup);
  const startPage = currentGroup * pagePerGroup + 1;
  const endPage = Math.min(startPage + pagePerGroup - 1,totalPage);
  const handlePrevGroup = ()=>{
    if(startPage>1){
      onPageChange(startPage-1);
    }
    else{
      onPageChange(startPage)
    }
  };
  const handleNextGroup = ()=>{
    if(endPage<totalPage){
      onPageChange(endPage+1);
    }
    else{
      onPageChange(endPage)
    }
  };
  const handleNextPage = ()=>{
    if(currentPage<totalPage){
      onPageChange(currentPage+1)
    }
  }
  const handlePrevPage = ()=>{
    if(currentPage>1){
      onPageChange(currentPage-1)
    }
  }
  const pageNumbers = [];
  for(let i = startPage; i<=endPage; i++){
    pageNumbers.push(i);
  }
  return(
    <S.PageSlicingDiv>
      <S.PageButton onClick={handlePrevGroup} style={{color:'#828282'}}>&lt;&lt;</S.PageButton>
      <S.PageButton onClick={handlePrevPage}style={{color:'#828282'}}>&lt;</S.PageButton>
      {pageNumbers.map((page)=>(
        <S.PageButton key={page} onClick={()=>onPageChange(page)} isActive={currentPage===page}>{page}</S.PageButton>
      ))}
      <S.PageButton onClick={handleNextPage}style={{color:'#828282'}}>&gt;</S.PageButton>
      <S.PageButton onClick={handleNextGroup}style={{color:'#828282'}}>&gt;&gt;</S.PageButton>
    </S.PageSlicingDiv>
  )
  
}
const AdminSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [adminSelect, setAdminSelect] = useState('가입자관리');
  const [selectedSort, setSelectedSort] = useState("50명씩 정렬");
  const [currentPage,setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [totalPage,setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };
  const analyzeQuery = (query)=>{
    if(query.includes('@')){
      return {email:query,username:null};
    }
    else{
      return {email:null,username:query};
    }
  }
  const searchUsers = async (query) => {
    setIsLoading(true);
    try {
      const { email, username } = analyzeQuery(query);
      let url = '/auth/operator/user-list';
      if (email) {
        url += `?searchType=email&keyword=${email}`;
      } else if (username) {
        url += `?searchType=username&keyword=${username}`;
      }
      console.log("보내는 URL:", url); // "/auth/operator/user?username=다소산" 출력 확인
      const res = await fetchRequest(url);
      const data = await res.json();
      console.log("검색겨로가",data.data.content)
      // 검색 결과가 단일 객체일 경우 배열로 변환 (백엔드 응답 구조에 따라 조정 필요)
      setUserData(data.data.content);
      setTotalPage(1); // 검색은 페이지네이션 없이 단일 결과로 가정 (필요 시 백엔드 조정)
    } catch (error) {
      console.error("사용자 검색 실패", error);
      setUserData([]);
      setTotalPage(1);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    if (searchQuery) {
      setCurrentPage(1); // 검색 시 페이지 초기화
      searchUsers(searchQuery);
    } else {
      // 검색어가 없으면 전체 리스트로 돌아감
      console.log("검색어없음")
      console.log(selectedSort )
      getUserList(0, getSizeFromSort(selectedSort));
    }
  };
  const getUserList = async(page = 0 , size = 50)=>{
    setIsLoading(true); // 데이터 요청 시작 시 로딩 ON
    try{
      const res = await fetchRequest(`/auth/operator/user-list?page=${page}&size=${size}`);
      const data = await res.json();
      setUserData(data.data.content);
      setTotalPage(data.data.page.totalPages);
    }catch(error){
      console.error("유저 리스트 불러오기 실패",error);
    }finally{
      setIsLoading(false);
    }
  };
  const getSizeFromSort = (sortOption) => {
    switch (sortOption) {
      case "5명씩 정렬": return 5;
      case "10명씩 정렬": return 10;
      case "50명씩 정렬": return 50;
      default: return 50;
    }
  };
  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setSearchQuery("")
    setCurrentPage(1); // 페이지 초기화
  };
  useEffect(() => {
    const size = getSizeFromSort(selectedSort);
    getUserList(currentPage-1,size);
  }, [selectedSort,currentPage]);
  return (
    // 1) 전체를 세로로 쌓는 flex 컨테이너
    <div style={{ boxSizing: 'border-box' }}>
      <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
      
      {adminSelect === 'Main' && <AdminMyPageMain/>}
      {adminSelect === '가입자관리' && (
        <MainWrapper>
          <AdminDiv style={{ paddingRight:'24px' }}>
            <S.TitleDiv>가입자 목록</S.TitleDiv>
            <S.SortTextDiv>가나다순 정렬</S.SortTextDiv>
            <S.SortSearchDiv>
              <S.SortButton
                isSelected={selectedSort === '50명씩 정렬'}
                onClick={()=>handleSortChange("50명씩 정렬")}
              >
                50명씩 정렬
              </S.SortButton>
              <S.SortButton
                isSelected={selectedSort === '10명씩 정렬'}
                onClick={()=>handleSortChange('10명씩 정렬')}
              >
                10명씩 정렬
              </S.SortButton>
              <S.SortButton
                isSelected={selectedSort === '5명씩 정렬'}
                onClick={()=>handleSortChange('5명씩 정렬')}
              >
                5명씩 정렬
              </S.SortButton>
              <S.SearchInput type='text' onKeyDown={handleKeyDown} onChange={handleSearchChange}value={searchQuery} placeholder='닉네임 또는 이메일로 검색하세요.'/>
              <S.SearchImgDiv onClick={handleSearchClick}><S.SearchImg src='/assets/Admin/search-logo.svg'/></S.SearchImgDiv>
            </S.SortSearchDiv>
            {isLoading ? (
              <Spinner loading={isLoading} /> // 로딩 중일 때 스피너 표시
            ) : (
              userData.length > 0 ? (
                userData.map((user, i) => (
                  <SearchUserComponent email={user.email} nickname={user.username} uuid={user.uuid} key={i} />
                ))
              ) : (
                <div>검색 결과가 없습니다.</div>
              )
            )}
          </AdminDiv>
          <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={setCurrentPage}/>
        </MainWrapper>
      )}
      {adminSelect === '팀관리' && <AdminTeamManage />}
    </div>
  );
};

export default AdminSearch;


