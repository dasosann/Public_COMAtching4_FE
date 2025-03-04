import React, { useEffect, useRef, useState } from 'react';
import { AdminRegisterHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import W from '../css/components/AdminWebmailStyle';
const EMAIL_VALID_DURATION = 180;
const AdminWebmail = () => {
    const [values,setValues]=useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(EMAIL_VALID_DURATION); // 180초 = 3분
    const handleChange = (e,index)=>{
        const value = e.target.value;
        if(value &&!/^\d$/.test(value)) return;

        const newValues = [...values]
        newValues[index]= value;
        setValues(newValues);

        if(value && index < 5){
            inputRefs.current[index+1].focus();
        }
    };
    const handleBackKey = (e,index)=>{
        if(e.key === 'Backspace' && !values[index] && index>0){
            inputRefs.current[index-1].focus();
        }
    }
    const handleResendButton = ()=>{
        localStorage.setItem('emailSendTimestamp',Date.now().toString());
        setTimeLeft(EMAIL_VALID_DURATION);
        // 이메일 재전송코드도 넣기;
    }
    const handleSendButton = ()=>{
        console.log(values)
        const codeString = values.join("");
        if(codeString.length !== 6 || codeString.includes(' ')){
            alert("6자리 숫자를 모두 입력해주세요.");
            return;
        }
        else if(timeLeft<=0){
            alert("시간이 만료되었습니다. 재발송 버튼을 눌러주세요");
            return;
        }
        const codeNumber = parseInt(codeString,10);
        console.log(codeNumber)
        // 보내고 응답받고 navigate 시키고 alert로 로그인됨 보여주기

    }
    useEffect(() => {
        if (timeLeft <= 0) return; // 시간이 다 되면 더 이상 감소시키지 않습니다.
        const timerId = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
    
        return () => clearInterval(timerId);
    }, [timeLeft]);
    useEffect(()=>{
        const storedTimestamp = localStorage.getItem('emailSendTimestamp');
        if(!storedTimestamp){
            // 이메일 전송
            localStorage.setItem('emailSendTimestamp',Date.now().toString());
        }
        else{
            const elapsed = Math.floor((Date.now()-parseInt(storedTimestamp,10))/1000);
            const remaining = EMAIL_VALID_DURATION - elapsed;
            setTimeLeft(remaining>0 ? remaining : 0);
        }
    },[]);
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
    return (
        <div>
            <AdminRegisterHeader/>
            <MainWrapper>
                <AdminDiv height="146px" onClick={handleSendButton} style={{cursor:'pointer'}} >
                    <W.TitleText>웹메일 인증하기</W.TitleText>
                    <W.SubText>이전 절차에서 입력한 웹메일로 6자리 숫자코드가 전송되었습니다.<br/>
                    이메일 코드는 3분 뒤에 만료되며, 최대 10번의 입력이 가능합니다. 이후에는 재발송 버튼을 눌러 인증코드를 다시 받아 주십시오.</W.SubText>
                </AdminDiv>
                <AdminDiv height="336px" style={{alignItems:'center', padding:'40px 24px', gap:'10px'}}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {values.map((value, index) => (
                        <W.NumInput
                          key={index}
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={value}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleBackKey(e, index)}
                        />
                      ))}
                    </div>
                    <W.FlexDiv>
                    {timeLeft > 0 ? (
                        <W.SubText>
                            남은 시간: {minutes}:{seconds.toString().padStart(2, '0')}
                        </W.SubText>
                    ) : (
                        <W.SubText>유효시간이 만료되었습니다.</W.SubText>
                    )}
                    <W.ResendButton onClick={handleResendButton}>재발송</W.ResendButton>
                    </W.FlexDiv>
                    <W.LeftTimeText>인증이 가능한 횟수 9회</W.LeftTimeText>
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminWebmail;