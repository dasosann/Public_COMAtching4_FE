import React, { useEffect, useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import S from '../../css/pages/Admin/AdminSearch';
import {AdminMyPageMain,AdminMyPageManage, AdminTeamManage} from '../../components/Admin/AdminMyPageMain';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchRequest from '../../fetchConfig';
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
          <S.DetailButton onClick={()=>navigate(`/adminpage/user/${uuid}`)}>상세정보 보기</S.DetailButton>
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
  };
  const handleNextGroup = ()=>{
    if(endPage<totalPage){
      onPageChange(endPage+1);
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
  const dummyData = Array.from({ length: 32 }, (_, i) => ({
    nickname: `User${i + 1}`,
    email: `user${i + 1}@example.com`,
    uuid : i
  }));
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [adminSelect, setAdminSelect] = useState('가입자관리');
  const [selectedSort, setSelectedSort] = useState("50명씩 정렬");
  const [currentPage,setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const totalPage = 32;
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };
  const handleSearchClick = () => {
    if (searchQuery) {
      axios
        .get(`/api/users/search`, { params: { query: searchQuery } })
        .then((response) => {
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    }
  };
  useEffect(() => {
    fetchRequest('/auth/operator/user-list')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.content)
        setUserData(data.data.content);
      });
  }, []);
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
                onClick={() => setSelectedSort('50명씩 정렬')}
              >
                50명씩 정렬
              </S.SortButton>
              <S.SortButton
                isSelected={selectedSort === '10명씩 정렬'}
                onClick={() => setSelectedSort('10명씩 정렬')}
              >
                10명씩 정렬
              </S.SortButton>
              <S.SortButton
                isSelected={selectedSort === '5명씩 정렬'}
                onClick={() => setSelectedSort('5명씩 정렬')}
              >
                5명씩 정렬
              </S.SortButton>
              <S.SearchInput type='text' placeholder='닉네임 또는 이메일로 검색하세요.'/>
              <S.SearchImgDiv onClick={handleSearchClick}><S.SearchImg src='/assets/Admin/search-logo.svg'/></S.SearchImgDiv>
            </S.SortSearchDiv>
            {userData.map((user,i)=>(
              <SearchUserComponent email={user.email} nickname={user.nickname} uuid={user.uuid} key={i}/>
            ))}
          </AdminDiv>
          <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={setCurrentPage}/>
        </MainWrapper>
      )}
      {adminSelect === '팀관리' && <AdminTeamManage />}
    </div>
  );
};

export default AdminSearch;


