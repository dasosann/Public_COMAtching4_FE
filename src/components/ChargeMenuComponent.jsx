import C from '../css/components/ChargeMenuComponentStyle';
    const ChargeMenuComponent = ({type, openSecondModal,setPointPrice, setProductName,setDiscount,setChargePoint}) => {
        let money = type;
        let discount = 0;
        const point = Number(type.replace(/,/g, '')); // 콤마를 제거하고 숫자로 변환
        
        switch(type){
            case '10,000':
                money = '8,000';
                discount= 2000;
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
        const handleOpenSecondModal = () => {
            // const numericPrice = parseInt(money.replace(",", ""), 10); 
            // PointPrice와 ProductName을 설정
            setProductName(`${type} 포인트`);
            setPointPrice(money); // 가격 설정
            setChargePoint(point)
            setDiscount(discount)
            console.log("가격: ",money)
            console.log("상품명: ", type)
            // 두 번째 모달 열기
            openSecondModal();
        };
        return (
            <div>
                <C.Container>
                    <C.StyledDiv>{type} 포인트&nbsp;&nbsp;
                    {discount>0? <C.BonusText>{discount}P 보너스!</C.BonusText>:<></>}</C.StyledDiv>
                    <C.StyledButton onClick={handleOpenSecondModal}>{money}원</C.StyledButton>
                </C.Container>
                <hr style={{margin:'0'}}/>
            </div>
        );
    };

    export default ChargeMenuComponent;