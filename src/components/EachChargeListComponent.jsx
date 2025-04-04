import React from 'react';
import E from '../css/components/EachChargeListComponentStyle'
const EachChargeListComponent = ({date, productName, amount, status,orderId}) => {
    return (
        <div>
            <E.ComponentWrapper>
                <E.TimeText>{date} | {orderId}</E.TimeText>
                <E.BodyWrapper>
                    <E.BodyText>{productName}</E.BodyText>
                    <E.BodyText>결제금액&nbsp;:&nbsp;{amount}원</E.BodyText>
                </E.BodyWrapper>
                <E.StatusText>상태:&nbsp;{status}</E.StatusText>
            </E.ComponentWrapper>
            <hr style={{padding:'0', margin:'0'}} />
        </div>
    );
};

export default EachChargeListComponent;