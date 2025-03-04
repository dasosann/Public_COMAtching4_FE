import React, { useState } from 'react';
import { AdminRegisterHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import R from '../css/pages/Admin/AdminRegister';
import { adminUserState } from '../Atoms';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const InputComponent = ({ name, title, placeholder, type, options, value, onChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: 'column', gap: '8px', justifyContent:"center" }}>
            <R.InputTitle>{title}</R.InputTitle>
            {options ? (
                <R.SelectBox name={name} value={value} onChange={onChange}>
                    <option value="" disabled hidden>{placeholder}</option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </R.SelectBox>
            ) : (
                <R.InputBox 
                    name={name} 
                    type={type} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                />
            )}
        </div>
    );
};
const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        email: "",
        name: "",
        university: "",
        authority: ""
    });

    // 🔹 입력값 변경 핸들러
    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    // 🔹 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["userId", "password", "confirmPassword", "email", "name", "university", "authority"];
        for(const field of requiredFields){
            if(!formData[field]||formData[field].trim()===""){
                alert(`${field} 입력이 누락되었습니다.`);
                return;
            }
        }
        console.log("회원가입 데이터:", formData);
        if(formData.password!=formData.confirmPassword){
            alert("비밀번호가 다릅니다 다시 입력해주세요")
            return ;
        }
        if(formData.authority==="관리자"){
            alert("회원가입이 완료되었습니다.")
            navigate("/adminpage",{state:{email:formData.email}});
        }else if(formData.authority==="오퍼레이터"){
            alert("오퍼레이터 가입이 완료되었습니다. 관리자의 승인이 필요합니다")
            navigate("/adminpage")
        }
        // 🚀 API 요청 예시 (백엔드 연결 시)
        // fetch("/api/register", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData)
        // }).then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error("Error:", error));
    };
    const inputFields = [
        {name:"userId", title: "아이디", placeholder: "아이디를 입력해주세요.", type: "text" },
        {name:"password", title: "비밀번호", placeholder: "비밀번호를 입력해주세요.", type: "password" },
        {name:"confirmPassword", title: "비밀번호 확인", placeholder: "비밀번호를 다시 한 번 입력해주세요.", type: "password" },
        {name:"email", title: "학교 웹메일", placeholder: "웹메일을 입력해주세요.", type: "email" },
        {}, // 빈 칸 (div 추가)
        {}, // 빈 칸 (div 추가)
        {name:"name", title: "이름", placeholder: "실명을 입력해주세요.", type: "text" },
        {
            name: "university",
            title: "소속 대학",
            placeholder: "선택",
            options: ["가톨릭대학교", "부천대학교", "동양미래대학교", "성공회대학교"]
        },
        {
            name: "authority",
            title: "신청 권한",
            placeholder: "선택",
            options: ["관리자","오퍼레이터"]
        }
    ]
    return (
        <div style={{display:'flex', flexDirection:'column',width:'auto',height:'100vh'}}>
            <AdminRegisterHeader/>
             <MainWrapper>
                <AdminDiv height="117px" onClick={handleSubmit} style={{cursor:"pointer"}}>
                    <R.TitleText>가입하기</R.TitleText>
                    <R.SubText>관리자의 승인을 받은 이후 오퍼레이터 권한을 사용할 수 있습니다</R.SubText>
                </AdminDiv>
                    <R.InputWrapper>
                        {inputFields.map((field, index) => (
                            Object.keys(field).length === 0
                            ? <div key={index}></div> // 빈 `div` 추가
                            : <InputComponent
                                key={index}
                                title={field.title}
                                placeholder={field.placeholder}
                                type={field.type}
                                name={field.name}
                                options={field.options}
                                onChange={handleChange}
                                value={formData[field.name]}
                              />
                        ))}
                    </R.InputWrapper>
             </MainWrapper>
        </div>
    );
};

export default AdminRegister;