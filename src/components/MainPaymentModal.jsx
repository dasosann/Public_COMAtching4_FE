
import AOS from 'aos';
import P from '../css/components/MainPaymentModalStyle';
import PopularPaymentMenu from './PopularPaymentMenu';
import 'aos/dist/aos.css'; // AOS 스타일 시트 불러오기
import MyPointCharge from './MyPointCharge';
import ChargeMenuComponent from './ChargeMenuComponent';
import AllPaymentMenu from './AllPaymentMenu';
import PointInformationFooter from './PointInformationFooter';
import PaymentSecondModal from './PaymentSecondModal';
import PointChargeListModal from './PointChargeListModal';
import { useEffect, useState } from 'react';
import {PaymentCancelModal,PaymentSuccessModal,WrongRequestModal} from './AfterPaymentModal';

const MainPaymentModal = ({isOpen, closeModal, paymentStatus,setPaymentStatus,amount}) => {
  // const [isOpen, setIsOpen] = useState(false); 
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 두 번째 모달 열기/닫기 상태
  const [isChargeListModalOpen, setIsChargeListModalOpen] = useState(false); 
  const [productName, setProductName] = useState();
  const [pointPrice, setPointPrice] = useState();
  const [discount, setDiscount] = useState();
  const [didAnimateOnce, setDidAnimateOnce] = useState(false);
  const [point, setChargePoint] = useState();

  // const closeModal = () => setIsOpen(false);
  
  
  // 두 번째 모달 열기
  const openSecondModal=()=>{
    console.log("isOpen", isOpen)
    setIsSecondModalOpen(true);
  }
  const closeSecondModal = () => setIsSecondModalOpen(false);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-quad',
      once: true,
    });
  }, []);

  // useEffect(() => {
  //   // 모달이 열렸고, 아직 애니메이션을 한 번도 안 했으면
  //   if (isOpen && !didAnimateOnce) {
  //     AOS.refresh();      // 애니메이션 갱신
  //     setDidAnimateOnce(true);  // 이후에는 실행 안 함
  //   }
  // }, [isOpen, didAnimateOnce]);
  useEffect(() => {
    if (paymentStatus === 'success' || paymentStatus === 'fail' ) {
      // 두 번째 모달을 닫고
      setIsSecondModalOpen(false);
    }
  }, [paymentStatus]);
  const isDimmed = isSecondModalOpen || paymentStatus === 'success' || paymentStatus === 'fail' || isChargeListModalOpen;
  // 결과 모달들 중 하나가 닫힐 때, 메인 모달 전체를 닫을지 vs 결과 모달만 닫을지 결정 가능
  const handleCloseResultModal = () => {
    // 예: 결과 모달 닫는 동시에 메인 모달까지 닫기
    setPaymentStatus(null);
    // 만약 "결과 모달만 닫고 MainPaymentModal은 계속 열어두겠다"면 closeModal() 대신 따로 상태 관리
  };
  const openChargeHistoryModal = () => {
    setIsChargeListModalOpen(true);
  };
  // 충전 내역 모달 닫기
  const closeChargeHistoryModal = () => {
    setIsChargeListModalOpen(false);
  };

  if (!isOpen) return null; // 모달 자체가 안 열려 있으면 렌더 안 함

  return (
    <div>
      <P.ModalWrapper show={isOpen} isSecondModalOpen={isSecondModalOpen} data-aos="fade-up">
        <P.ModalContent onClick={(e) => e.stopPropagation()} isDimmed={isDimmed}>
          <div style={{position:'sticky', zIndex:'1', top:'0', backgroundColor:'white', paddingTop:'24px', paddingBottom:'23px'}}>
            <P.Header>
              <P.ChargePointText>포인트 충전</P.ChargePointText>
              <P.CloseButton onClick={closeModal}>닫기</P.CloseButton>
            </P.Header>
            <MyPointCharge onOpenChargeHistory={openChargeHistoryModal} />
          </div>
          <PopularPaymentMenu openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount} setChargePoint={setChargePoint}/>
          <AllPaymentMenu openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName}setDiscount={setDiscount} setChargePoint={setChargePoint} />
          <PointInformationFooter />
        </P.ModalContent>
        <PaymentSecondModal data-aos="fade-up" closeSecondModal={closeSecondModal} isOpen={isSecondModalOpen} closeModal={closeSecondModal} productName={productName} pointPrice={pointPrice}discount={discount} point={point} />
        {isChargeListModalOpen && (
          <PointChargeListModal
          isOpen={isChargeListModalOpen}
          onClose={closeChargeHistoryModal}
          closeAllModal = {closeModal}
          />
        )}
        {paymentStatus === 'success' && (
        <PaymentSuccessModal onClose={handleCloseResultModal} amount={amount} />
        )}
        {paymentStatus === 'fail' && (
        <WrongRequestModal onClose={handleCloseResultModal} />
        )}
        
      </P.ModalWrapper>

    </div>
  );
};

export default MainPaymentModal;