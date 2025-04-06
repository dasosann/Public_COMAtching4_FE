    import React, { useEffect, useState } from 'react';
    import M from '../../css/pages/Admin/AdminPointManageStyle';
    import { AdminHeader } from '../../components/Admin/AdminHeader';
    import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
    import { useLocation, useParams } from 'react-router-dom';
    import Modal from '../../css/pages/Admin/AdminModalAll'
import fetchRequest from '../../fetchConfig';
import Spinner from '../../components/Admin/Spinner';
import { header } from '../../css/components/HeaderMain.css';
    const AdminPointManage = () => {
        const [adminSelect, setAdminSelect] = useState('가입자관리');
        const [points, setPoints] = useState(""); // 기본값을 빈 문자열로 설정
        const [reason, setReason] = useState('');
        const [showSecondModal, setShowSecondModal] = useState(false);  // 두 번째 모달 표시 여부
        const [showModal, setShowModal] = useState(false);
        const { state } = useLocation();
        const { uuid } = useParams();  // URL 경로에서 uuid 추출
        const [userData, setUserData] = useState(null); // 사용자 정보를 저장할 상태
        const [currentPoint, setCurrentPoint] = useState(null); // 최신 포인트 정보
        const gender ="남"
         // 최종 포인트 계산 (기존 포인트 + 조정된 포인트)
         const adjustedPoints = points === "" ? 0 : Number(points);
         const totalPoints = userData ? Number(userData.data.point) + adjustedPoints : adjustedPoints;
         const isActive = adjustedPoints > 0;
         useEffect(()=>{
                
            if (!uuid) {
                alert("유효하지 않은 사용자 정보입니다.");
                return;
            } 
            const getUserData  = async () =>{
                try{
                    const response = await fetchRequest(`/auth/operator/user?uuid=${uuid}`,{
                        method:"GET"
                    });
                    const data = await response.json();
                    setUserData(data);
                }catch(error){
                    console.error("사용자 정보를 가져오는데 실패했습니다",error)
                }
            };
            getUserData();
        },[]);
        const fetchUpdatedPoints = async () => {
            try {
              const response = await fetchRequest(`/auth/operator/user?uuid=${uuid}`, {
                method: "GET"
              });
              const data = await response.json();
              // 예를 들어, { point: 최신포인트 } 형식의 응답을 받는다고 가정
              if (data.data && data.data.point !== undefined) {
                console.log("받아오는 최신 포인트 정보", data.data.point);
                setCurrentPoint(data.data.point);
                setPoints("");
                setUserData(prevUserData =>({
                    data:{
                        ...prevUserData.data,
                        point:data.data.point
                    }
                }));
              }
            } catch (error) {
              console.error("업데이트된 포인트를 가져오는데 실패했습니다", error);
            }
          };
        if (!userData) {
            return <Spinner />;
          }
        // 포인트 증가 함수 (500씩 증가)
        const handleIncrease = () => {
            setPoints((prevPoints) => {
                const numericValue = Number(prevPoints);
                // 최대 포인트 30,000까지 증가하도록 설정

                return numericValue + 500 <= 30000 
                ? `${(numericValue + 500) >= 0 ? '+' : ''}${numericValue + 500}` 
                : "+30000";
            });
        };
        const onChangeReason = (e)=>{
            setReason(e.target.value);
        }
        // 포인트 감소 함수 (500씩 감소, -30,000 이하로 내려가지 않도록 설정)
        const handleDecrease = () => {
            setPoints((prevPoints) => {
                const numericValue = Number(prevPoints);
                // 최소 포인트 -30,000까지 설정
                return numericValue - 500 >= -30000 
                ? `${numericValue - 500 >= 0 ? '+' : ''}${numericValue - 500}` 
                : "-30000"; 
            });
        };
        const handleSubmit = () => {
            console.log("type", typeof(adjustedPoints), adjustedPoints)
            // 포인트가 0보다 크고, 사유가 50자 이상일 때만 실행
            if (reason.length < 10 && adjustedPoints === 0 ) {
                alert("조정할 포인트가 0이 아니고 사유가 10자 이상이어야 합니다.");
                return;
            }
            else if (adjustedPoints>30000 || adjustedPoints<-30000){
                console.log(adjustedPoints)
                alert("포인트는 최대 30000까지 조절 가능합니다.")
                return;
            }
            else if(reason.length < 10){
                alert("사유가 10자 이상이어야 합니다.")
                return;
            }
            else if (adjustedPoints===0){
                alert("조정할 포인트가 0이 아니어야 합니다.")
                return;
            }
            else if (totalPoints<0){
                alert("포인트를 음수로 조정할 수 없습니다.")
                return;
            }
            
            else{
                setShowModal(true);
            }
            // 조건을 만족할 경우 실제 onClick 동작을 진행
        }
        // 사용자 입력 값 처리 함수
        const handleInputChange = (e) => {
            let value = e.target.value;
            
            // 빈 값일 경우 0으로 처리
            if (value === "") {
                setPoints("");
            } else if (/^[-]?\d*$/.test(value)) {
                const numericValue = Number(value);
                // -30,000 이하와 30,000 이상을 제한
                // if (numericValue >= -30000 && numericValue <= 30000) {
                //     setPoints(value);  // 입력값 그대로 저장
                // }
                // else{
                //     alert("범위 제한")
                // }
                setPoints(value)
            }
        };
        const handleCloseModal = () =>{
            setShowModal(false)
        }
        const handleFirstModalConfirm = async() => {
            setShowModal(false);  // 첫 번째 모달 닫기
            if (!uuid) {
                alert("유효하지 않은 사용자 정보입니다.");
                return;
            }
            const payload = {
                uuid: uuid,               // 쿼리파라미터에서 추출한 uuid
                point: adjustedPoints,    // 조정된 포인트 (숫자)
                reason: reason            // 입력한 사유
            };
            try{
                const response = await fetchRequest('/auth/operator/api/point',{
                    method: 'PATCH',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
                console.log("사용자 포인트 조정 완료");
                await fetchUpdatedPoints();
                setShowSecondModal(true);
               
            }catch(error){
                console.error("데이터 전송 실패",error);
                alert("포인트 조정에 실패했습니다.")
            }
        };
        const handleCloseSecondModal = () => {
            setShowSecondModal(false);
        };
       
        return (
            <div>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
                <MainWrapper>
                    <AdminDiv>
                        <M.TitleDiv>포인트 조정</M.TitleDiv>
                        <M.SubTitleDiv>오류 및 패널티 관련 포인트 조정 기능. 포인트는 최대 한 번에 30000P까지 조정 가능합니다.</M.SubTitleDiv>
                        <M.NickNameDiv>
                            <span>Nickname : </span>
                            <M.NickNameSpan>{userData.data.username}</M.NickNameSpan>
                            <M.ImgDiv style={{ width: '32px', height: '32px' }}>
                                {gender === "남" ? <img src='/assets/Admin/male-icon.svg' alt='남성 아이콘' /> : <img src='/assets/Admin/female-icon.svg' alt='여성 아이콘' />}
                            </M.ImgDiv>
                        </M.NickNameDiv>
                        <M.AvailablePointDiv>Available Points : {currentPoint ? currentPoint : userData.data.point}P</M.AvailablePointDiv>
                        <M.ManagePointWrapper>
                            <span style={{ marginRight: '12px' }}>포인트 조정&nbsp;&nbsp;: </span>
                            <M.ControlPointButton onClick={handleDecrease} src="/assets/Admin/minus-button.svg" alt="빼기" />
                            {/* 음수와 양수 모두 허용, 빈 문자열 처리 */}
                            <M.PointManageInput
                                type='text'
                                value={adjustedPoints === 0 ? "" : points} // 빈 문자열로 처리
                                onChange={handleInputChange}  // 사용자 입력 처리
                                placeholder='포인트 입력'
                                isActive = {isActive}
                                adjustedPoints={adjustedPoints}
                            />
                            <M.ControlPointButton onClick={handleIncrease} src="/assets/Admin/plus-button.svg" alt="더하기" />
                        </M.ManagePointWrapper>
                        <M.ManagePointResult>
                            <span>조정 후 포인트&nbsp;&nbsp;: </span>
                            <span>{totalPoints}</span>
                        </M.ManagePointResult>
                    </AdminDiv>
                    <AdminDiv style={{paddingRight:'24px'}}>
                        <div style={{display:'flex',gap:'8px',alignItems:'end'}}>
                            <M.TitleDiv>포인트 조정 사유</M.TitleDiv>
                            <M.SubTitleDiv style={{margin:'0'}}>(10자 이상)</M.SubTitleDiv>
                        </div>
                        <M.SubTitleDiv style={{fontSize:'20px',margin:'0'}}>모든 조정 사유는 히스토리에 기록되며, 이후 수정 또는 삭제할 수 없습니다.</M.SubTitleDiv>
                        <M.ManageReason type='text' onChange={onChangeReason} maxLength={200}/>
                        <M.SubmitButton isActive={reason.length>10 && adjustedPoints != 0} onClick={handleSubmit}>조정</M.SubmitButton>
                    </AdminDiv>
                    {showModal && (
                        <Modal.Overlay>
                            <Modal.ModalContainer>
                                <Modal.ModalContent>정말로 포인트를 조정하시겠습니까? <br/>이 작업은<br/>수정 또는 삭제할 수 없습니다.</Modal.ModalContent>
                                <Modal.ModalConfirm >
                                    <Modal.ModalConfirmButton onClick={handleCloseModal} style={{ borderRight:'1px solid #b3b3b3'}}>취소</Modal.ModalConfirmButton>
                                    <Modal.ModalConfirmButton onClick={handleFirstModalConfirm}>확인</Modal.ModalConfirmButton>
                                </Modal.ModalConfirm>
                            </Modal.ModalContainer>
                        </Modal.Overlay>
                    )}
                    {showSecondModal && (
                    <Modal.Overlay>
                        <Modal.ModalContainer>
                            <Modal.ModalContent>
                                해당 가입자의 포인트를 <br/>정상적으로 조정하였습니다.<br/>
                                {userData.data.point}P {`->`} {totalPoints}P
                            </Modal.ModalContent>
                            <Modal.ModalConfirm>
                                <Modal.ModalConfirmButton onClick={handleCloseSecondModal}>확인</Modal.ModalConfirmButton>
                            </Modal.ModalConfirm>
                        </Modal.ModalContainer>
                    </Modal.Overlay>
                    )}
                </MainWrapper>
            </div>
        );
    };
export default AdminPointManage;
