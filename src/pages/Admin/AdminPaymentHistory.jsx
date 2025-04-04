import React, { useEffect, useState } from 'react';
import P from '../../css/pages/Admin/AdminPaymentHistoryStyle';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { useParams } from 'react-router-dom';
import fetchRequest from '../../fetchConfig';
import Spinner from '../../components/Admin/Spinner';
const PaymentHistoryComponent = ({ cancelReason, orderId, point, tossPaymentMethod, price, approvedAt }) => {
    return (
        <P.ComponentWrapper>
            <P.PaymentStatusDiv>
            <div style={{display:'flex'}}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  {cancelReason === "정상 결제" ? (
                    <>
                      <P.Circle backgroundColor="#3fea3a" />
                      <P.StatusText color="#3fea3a">결제 성공</P.StatusText>
                    </>
                  ) : (
                    <>
                      <P.Circle backgroundColor="#ea3a3a" />
                      <P.StatusText color="#ea3a3a">결제 실패</P.StatusText>
                    </>
                  )}
                </div>
                <P.DateText>{approvedAt}</P.DateText>
            </div>
            <P.OrderNumberText>{orderId}</P.OrderNumberText>
            </P.PaymentStatusDiv>
            <P.ComponentSecondDiv>
                <div style={{display:'flex',alignItems:'center'}}>
                    <img src="/assets/MainPayment/coin.svg" alt="코인" style={{width:'32px',height:'32px', marginRight:'1.5px'}}/>
                    <P.DefaultSpan>결제액&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'100px', textAlign:'center'}}>{price} </P.DefaultSpan>
                    <P.DefaultSpan>원</P.DefaultSpan>
                </div>
                <div style={{display:'flex', alignItems:'center', height:'32px'}}>
                    <P.DefaultSpan>충전 포인트&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'120px', textAlign:'center'}}>{point} </P.DefaultSpan>
                    <P.DefaultSpan>P</P.DefaultSpan>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <P.DefaultSpan>결제수단&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'172px', textAlign:'center'}}>{tossPaymentMethod} </P.DefaultSpan>
                </div>
                
            </P.ComponentSecondDiv>
        </P.ComponentWrapper>
    )
}
const AdminPaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const { uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        const fetchPaymentHistory =async () =>{
          setIsLoading(true);
          try{
            const response = await fetchRequest(`/auth/operator/api/history/payment/${uuid}`);
            const data = await response.json()
            if(!response.ok){
              throw new Error("결제 내역 불러오기 실패!");
            }
            console.log("json으로 변환한 데이터의 데이터",data.data);
            setPaymentHistory(data.data)
          }catch(error){
            console.error("try문 밖에서 오류 발생",error);
          }finally{
            setIsLoading(false)
          }
        };
        if(uuid){
          fetchPaymentHistory();
        }
    },[uuid])
   
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper>
                <AdminDiv style={{paddingRight:'24px'}}>
                    <P.PaymentTitle>결제내역</P.PaymentTitle>
                    <P.SubText>최신순 정렬</P.SubText>
                    {isLoading ? (
                        <Spinner loading={isLoading} />
                      ) : (
                        <P.PaymentHistoryDiv>
                          {paymentHistory.length > 0 ? (
                            paymentHistory.map((data, i) => (
                              <PaymentHistoryComponent key={i} {...data} />
                            ))
                          ) : (
                            <div>결제 내역이 없습니다.</div>
                          )}
                        </P.PaymentHistoryDiv>
                      )}
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminPaymentHistory;