
import ChargeMenuComponent from './ChargeMenuComponent';
import P from '../css/components/PopularPaymentMenuStyle'
const PopularPaymentMenu = ({discountRate, openSecondModal,setPointPrice, setProductName, setDiscount, setChargePoint}) => {
    const validDiscountRate = [0, 10, 20, 30, 40].includes(Number(discountRate)) ? Number(discountRate) : 0;
    return (
        <P.Container>
            <P.PopularText>인기</P.PopularText>
            <ChargeMenuComponent discountRate={validDiscountRate} type={`5,000`} openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName}setDiscount={setDiscount} setChargePoint={setChargePoint}/>
            <ChargeMenuComponent discountRate={validDiscountRate} type={`10,000`} openSecondModal={openSecondModal}  setPointPrice={setPointPrice} setProductName={setProductName}setDiscount={setDiscount} setChargePoint={setChargePoint}/>
        </P.Container>
    );
};

export default PopularPaymentMenu;