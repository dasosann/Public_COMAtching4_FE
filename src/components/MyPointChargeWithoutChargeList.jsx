import React from 'react';
import M from '../css/components/MyPointChargeStyle';
import { useRecoilState } from 'recoil';
import { userState } from '../Atoms';
const MyPointChargeWithoutChargeList = ({userPoint}) => {
    const [user, setUser] = useRecoilState(userState); // Recoil 상태 사용
    return (
        <M.Container>
            <img src='/assets/MainPayment/coin.svg'/>
            <div style={{display:'flex',flexDirection:'column', gap:'4px',alignItems:'flex-start'}}>
                <M.HoldPoint>보유 포인트</M.HoldPoint>
                <M.MyHoldPoint>{user.point}P</M.MyHoldPoint>
            </div>
        </M.Container>
    );
};

export default MyPointChargeWithoutChargeList;