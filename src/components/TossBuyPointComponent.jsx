import T from '../css/components/TossBuyPointComponentStyle';
const TossBuyPointComponent = ({productName, pointPrice, discount}) => {
    return (
        <T.Container>
            <div style={{textAlign:'left'}}>
                {productName}&nbsp;
                {discount>0 && <T.BonusText>{discount}P 보너스!</T.BonusText>}
            </div>
            <T.PaymentPriceText>결제 금액&nbsp; <T.PriceText>{pointPrice} 원</T.PriceText></T.PaymentPriceText>
        </T.Container>
    );
};

export default TossBuyPointComponent;