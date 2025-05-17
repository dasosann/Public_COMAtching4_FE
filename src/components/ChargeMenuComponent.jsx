import C from '../css/components/ChargeMenuComponentStyle';

const ChargeMenuComponent = ({
    type,
    openSecondModal,
    setPointPrice,
    setProductName,
    setDiscount,
    setChargePoint,
    discountRate = 0,
}) => {
    let money = type;
    let discount = 0;
    const point = Number(type.replace(/,/g, '')) || 0;

    switch (type) {
        case '10,000':
            money = '8,000';
            discount = 2000;
            break;
        case '20,000':
            money = '15,000';
            discount = 5000;
            break;
        case '30,000':
            money = '20,000';
            discount = 10000;
            break;
        default:
            break;
    }

    const numericMoney = Number(money.replace(/,/g, '')) || 0;
    const finalPrice = discountRate > 0 ? numericMoney * (1 - discountRate / 100) : numericMoney;
    const formattedFinalPrice = Math.round(finalPrice).toLocaleString();
    const originalPrice = numericMoney.toLocaleString();

    const handleOpenSecondModal = () => {
        setProductName(`${type} 포인트`);
        setPointPrice(formattedFinalPrice);
        setChargePoint(point);
        setDiscount(discount);
        console.log('가격:', formattedFinalPrice);
        console.log('상품명:', type);
        console.log('할인:', discount);
        console.log('이벤트 할인율:', discountRate);
        openSecondModal();
    };

    return (
        <div>
            <C.Container>
                <C.StyledDiv>
                    {type} 포인트
                    {discount > 0 && <C.BonusText>{discount}P 보너스!</C.BonusText>}
                </C.StyledDiv>
                <C.StyledButton onClick={handleOpenSecondModal}>
                    {formattedFinalPrice}원
                    {discountRate > 0 && (
                        <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: '#888' }}>
                            {originalPrice}원
                        </span>
                    )}
                </C.StyledButton>
            </C.Container>
            <hr style={{ margin: '0' }} />
        </div>
    );
};

export default ChargeMenuComponent;