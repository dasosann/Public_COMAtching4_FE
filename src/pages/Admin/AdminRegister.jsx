import React, { useState } from 'react';
import { AdminRegisterHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import R from '../../css/pages/Admin/AdminRegister';
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
        accountId: "",
        password: "",
        confirmPassword: "",
        schoolEmail: "",
        nickname: "",
        university: "",
        role:"",
    });

    // 🔹 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "accountId",
            "password",
            "confirmPassword",
            "schoolEmail",
            "nickname",
            "university",
            "role"
        ];
        for(const field of requiredFields){
            if(!formData[field]||formData[field].trim()===""){
                alert(`${field} 입력이 누락되었습니다.`);
                return;
            }
        }

        if(formData.password !== formData.confirmPassword){
            alert("비밀번호가 다릅니다. 다시 입력해주세요.");
            return ;
        }

        // ROLE 값 변환
        let roleToSend = "";
        if(formData.role === "관리자"){
            roleToSend = "ROLE_SEMI_ADMIN";
        } else if(formData.role === "오퍼레이터"){
            roleToSend = "ROLE_SEMI_OPERATOR";
        }

        const requestBody = {
            ...formData,
            role: roleToSend
        };

        try {
            const response = await fetch("https://backend.comatching.site/admin/register", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log("회원가입 응답:", data);
            if(data.status===200){
                // 2xx 성공 구간
                if(formData.role === "관리자"){
                    alert("회원가입이 완료되었습니다.");
                    navigate("/adminpage", { state: { email: formData.schoolEmail } });
                } else if(formData.role === "오퍼레이터"){
                    alert("오퍼레이터 가입이 완료되었습니다. 관리자의 승인이 필요합니다.");
                    navigate("/adminpage");
                }
            } else if(data.status === 400 && formData.role==="관리자" ) {
                // 4xx 에러 구간
                alert("이미 해당 학교에 최고 관리자가 존재합니다.");
            } else if(data.status === 400 && formData.role ==="오퍼레이터"){
                alert("중복된 계정의 사용자가 존재합니다.")
            }
             else {
                // 그 외 에러 (서버 에러 등)
                alert(`회원가입 실패: ${data.message || '에러가 발생했습니다.'}`);
            }
        } catch(error) {
            console.error("회원 가입 요청 중 에러 발생", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const inputFields = [
        { name:"accountId",        title: "아이디",       placeholder: "아이디를 입력해주세요.",          type: "text"     },
        { name:"password",         title: "비밀번호",     placeholder: "비밀번호를 입력해주세요.",          type: "password" },
        { name:"confirmPassword",  title: "비밀번호 확인", placeholder: "비밀번호를 다시 한 번 입력해주세요.", type: "password" },
        { name:"schoolEmail",      title: "학교 웹메일",  placeholder: "웹메일을 입력해주세요.",            type: "email"    },
        {}, // 빈 칸 (div 추가)
        {}, // 빈 칸 (div 추가)
        { name:"nickname",         title: "이름",         placeholder: "실명을 입력해주세요.",             type: "text"     },
        {
            name: "university",
            title: "소속 대학",
            placeholder: "선택",
            options: ["가톨릭대학교", "부천대학교", "동양미래대학교", "성공회대학교"]
        },
        {
            name: "role",
            title: "신청 권한",
            placeholder: "선택",
            options: ["관리자","오퍼레이터"]
        }
    ];

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
