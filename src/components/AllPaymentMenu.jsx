import P from '../css/components/AllPaymentMenuStyle';
import ChargeMenuComponent from './ChargeMenuComponent';

const AllPaymentMenu = ({ discountRate = 0, openSecondModal, setPointPrice, setProductName, setDiscount, setChargePoint }) => {
    // discountRate 유효성 검사 (0, 10, 20, 30, 40만 허용)
    const validDiscountRate = [0, 10, 20, 30, 40].includes(Number(discountRate)) ? Number(discountRate) : 0;

    return (
        <P.Container>
            <P.PopularText>전체</P.PopularText>
            <ChargeMenuComponent
                type="1,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="2,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="3,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="4,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="5,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="10,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
            <ChargeMenuComponent
                type="20,000"
                openSecondModal={openSecondModal}
                setPointPrice={setPointPrice}
                setProductName={setProductName}
                setDiscount={setDiscount}
                setChargePoint={setChargePoint}
                discountRate={validDiscountRate}
            />
        </P.Container>
    );
};

export default AllPaymentMenu;