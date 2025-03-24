import React, { useEffect, useState } from 'react';
import P from '../../css/pages/Admin/AdminPaymentHistoryStyle';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
const PaymentHistoryComponent = ({ status, orderNumber, chargePoint, paymentMethod, amount, paymentTime }) => {
    return (
        <P.ComponentWrapper>
            <P.PaymentStatusDiv>
            <div style={{display:'flex'}}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  {status === "Completed" ? (
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
                <P.DateText>{paymentTime}</P.DateText>
            </div>
            <P.OrderNumberText>{orderNumber}</P.OrderNumberText>
            </P.PaymentStatusDiv>
            <P.ComponentSecondDiv>
                <div style={{display:'flex',alignItems:'center'}}>
                    <img src="/assets/MainPayment/coin.svg" alt="코인" style={{width:'32px',height:'32px', marginRight:'1.5px'}}/>
                    <P.DefaultSpan>결제액&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'100px', textAlign:'center'}}>{amount} </P.DefaultSpan>
                    <P.DefaultSpan>원</P.DefaultSpan>
                </div>
                <div style={{display:'flex', alignItems:'center', height:'32px'}}>
                    <P.DefaultSpan>충전 포인트&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'120px', textAlign:'center'}}>{chargePoint} </P.DefaultSpan>
                    <P.DefaultSpan>P</P.DefaultSpan>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <P.DefaultSpan>결제수단&nbsp;&nbsp;: </P.DefaultSpan>
                    <P.DefaultSpan style={{width:'172px', textAlign:'center'}}>{paymentMethod} </P.DefaultSpan>
                </div>
                
            </P.ComponentSecondDiv>
        </P.ComponentWrapper>
    )
}
const AdminPaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    // useEffect(()=>{
    //     const fetchData= async ()=>{
    //         try{
    //             const response = await fetch(``);
    //             const data = response.json();
    //             setPaymentHistory(data);
    //         }catch(error){
    //             console.log("결제 정보 가져오는 중 오류 발생",error)
    //         }
    //     }
    // },[])
    const testData = [
        {
          "status": "Completed",
          "orderNumber": "XYZ1054320FYAAD",
          "chargePoint": 5000,
          "paymentMethod": "Credit Card",
          "amount": 1000,
          "paymentTime": "2025-03-18T12:30:00"
        },
        {
          "status": "Pending",
          "orderNumber": "XYZ1054320FYAAD",
          "chargePoint": 30000,
          "paymentMethod": "PayPal",
          "amount": 5000,
          "paymentTime": "2025-03-19T09:00:00"
        },
        {
          "status": "Failed",
          "orderNumber": "XYZ1054320FYAAD",
          "chargePoint": 20000,
          "paymentMethod": "Debit Card",
          "amount": 2000,
          "paymentTime": "2025-03-20T15:30:00"
        },
        {
          "status": "Completed",
          "orderNumber": "XYZ1054320FYAAD",
          "chargePoint": 7000,
          "paymentMethod": "Credit Card",
          "amount": 15000,
          "paymentTime": "2025-03-21T11:15:00"
        },
        {
          "status": "Completed",
          "orderNumber": "XYZ1054320FYAAD",
          "chargePoint": 10000,
          "paymentMethod": "Bank Transfer",
          "amount": 2000,
          "paymentTime": "2025-03-22T14:45:00"
        }
      ];
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper>
                <AdminDiv style={{paddingRight:'24px'}}>
                    <P.PaymentTitle>결제내역</P.PaymentTitle>
                    <P.SubText>최신순 정렬</P.SubText>
                    <P.PaymentHistoryDiv>
                        {testData.map((data,i)=><PaymentHistoryComponent key={i} {...data}/>)}
                    </P.PaymentHistoryDiv>
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminPaymentHistory;