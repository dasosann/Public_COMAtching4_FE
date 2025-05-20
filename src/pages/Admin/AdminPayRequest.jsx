import React, { useEffect, useState } from 'react';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import R from '../../css/pages/Admin/AdminPayRequestStyle';
import S from '../../css/pages/Admin/AdminSearch';
import P from '../../css/pages/Admin/AdminPaymentHistoryStyle';
import fetchRequest from '../../fetchConfig';

const RequestUserComponent = ({ orderId, point, username, price, requestAt, productName, onUpdate,realName }) => {
  const formatDateTime = (isoString) => {
    if (!isoString || typeof isoString !== 'string') {
        return '알 수 없음'; // 잘못된 입력 처리
    }

    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            return '알 수 없음'; // 유효하지 않은 날짜
        }

        // KST 시간대 적용 (UTC+9)
        const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

        const year = kstDate.getUTCFullYear();
        const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(kstDate.getUTCDate()).padStart(2, '0');
        const hours = String(kstDate.getUTCHours()).padStart(2, '0');
        const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
    } catch (error) {
        console.error('날짜 포맷팅 오류:', error);
        return '알 수 없음';
    }
};
  const handleApprove = async () => {
    try {
      const response = await fetchRequest('/auth/operator/tempay/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      console.log('수락 성공:', await response.json());
      alert('충전 요청이 수락되었습니다.');
      onUpdate();
    } catch (error) {
      console.error('수락 중 오류:', error);
      alert('수락 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetchRequest('/auth/operator/tempay/refund', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      console.log('거절 성공:', await response.json());
      alert('충전 요청이 거절되었습니다.');
      onUpdate();
    } catch (error) {
      console.error('거절 중 오류:', error);
      alert('거절 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <P.ComponentWrapper>
      <P.PaymentStatusDiv style={{ padding: '0', justifyContent: 'start', gap: '20px' }}>
        <R.UserIdDiv>닉네임 : <R.IdSpan>{username}</R.IdSpan></R.UserIdDiv>
        <R.UserIdDiv>입금자명 : <R.IdSpan>{realName}</R.IdSpan></R.UserIdDiv>
        <P.DateText>요청시각 : {formatDateTime(requestAt)}</P.DateText>
        <P.OrderNumberText style={{ margin: '0' }}>주문번호 : {orderId}</P.OrderNumberText>
      </P.PaymentStatusDiv>
      <P.ComponentSecondDiv>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/MainPayment/coin.svg" alt="코인" style={{ width: '32px', height: '32px', marginRight: '1.5px' }} />
          <P.DefaultSpan>{productName}</P.DefaultSpan>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
          <P.DefaultSpan>가격 : </P.DefaultSpan>
          <P.DefaultSpan style={{ width: '120px', textAlign: 'center' }}>{price}원 </P.DefaultSpan>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '32px', gap: '8px' }}>
          <S.DetailButton style={{ width: '100px', height: '100%' }} onClick={handleApprove}>수락</S.DetailButton>
          <S.DetailButton style={{ width: '100px', height: '100%' }} onClick={handleReject}>거절</S.DetailButton>
        </div>
      </P.ComponentSecondDiv>
    </P.ComponentWrapper>
  );
};

const AdminPayRequest = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [adminSelect, setAdminSelect] = useState("가입자관리");
  const [userData, setUserData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchRequest('/auth/operator/tempay/charge-list');
      const data = await res.json();
      console.log("가져온 데이터:", data.data);
      setUserData(data.data);
      setFilteredData(data.data); // 초기엔 전체 데이터 표시
    } catch (error) {
      console.error("결제 요청 리스트 가져오는 중 오류 발생", error);
      setUserData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      const filtered = userData.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(userData); // 검색어 없으면 전체 데이터 표시
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
      <MainWrapper>
        <AdminDiv style={{ cursor: 'default', paddingRight: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <R.TitleDiv>충전 요청 목록</R.TitleDiv>
              <R.SortTextDiv>유저로부터 이름, 아이디, 입금 내역 확인해서 충전을 진행합니다.</R.SortTextDiv>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <S.SearchInput
                type="text"
                onKeyDown={handleKeyDown}
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="닉네임으로 검색하세요."
              />
              <S.SearchImgDiv onClick={handleSearchClick}>
                <S.SearchImg src="/assets/Admin/search-logo.svg" />
              </S.SearchImgDiv>
              <img
                src="/assets/Admin/refresh-button.svg"
                alt="새로고침"
                onClick={fetchData}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          {isLoading ? (
            <div>Loading...</div> // 로딩 중 UI, 필요 시 Spinner 사용
          ) : filteredData.length > 0 ? (
            filteredData.map((data, i) => (
              <RequestUserComponent {...data} key={i} onUpdate={fetchData} />
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </AdminDiv>
      </MainWrapper>
    </div>
  );
};

export default AdminPayRequest;