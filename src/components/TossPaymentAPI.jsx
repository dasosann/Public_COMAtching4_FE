import { loadTossPayments,ANONYMOUS} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = import.meta.env.VITE_CLIENT_KEY;

export function PaymentCheckoutPage({amount, orderName, currency, customerKey, orderId, email, username, closeSecondModal}) {
  console.log("amount",amount)
  console.log("orderName",orderName)
  console.log("customerkey",customerKey)
  console.log("orderId",orderId)
  const [payment, setPayment] = useState(null);
//   const [isPaymentRequested, setIsPaymentRequested] = useState(false); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        // console.log(tossPayments)
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        
        const payment = tossPayments.payment({
          customerKey,
        });
     
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [clientKey, customerKey]);
  useEffect(() => {
    console.log("payement",payment)
    if (payment) {
      // payment 객체가 준비되면 바로 결제 요청
      requestPayment();
    }
  }, [payment]); // payment가 로드되면 자동으로 결제 요청
  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
//   @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
async function requestPayment() {
  try {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    const response = await payment.requestPayment({
      method: "CARD", // 카드 및 간편결제
      amount: { currency, value: amount },
      orderId: orderId, // 고유 주문번호
      orderName: orderName,
      successUrl: window.location.origin + "/test?status=success",
      failUrl: window.location.origin + "/test?status=fail",
      customerEmail: email,
      customerName: username,
      // customerMobilePhone: "01012341234",r
      // 카드 결제에 필요한 정보
      card: {
        useEscrow: false,
        flowMode: "DEFAULT", // 통합결제창 여는 옵션
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
    
    // 요청이 성공한 경우 처리
    console.log("Payment request successful:", response);
  } catch (error) {
    // 요청 중 에러가 발생한 경우 처리
    console.error("Payment request failed:", error);

    // 추가 에러 처리 (UI에 알림 표시 등)
    alert("결제 취소하셨습니다.");
    closeSecondModal();
  }
}
  return null;
} 