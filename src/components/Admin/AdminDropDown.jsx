import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일링된 컴포넌트 정의
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DropdownButton = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 13.5px 8px;
  font-size: 18px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #b3b3b3;
  border-radius: 0px;
  backdrop-filter: blur(50px);
  width: 280px;
  height: 48px;
  background: linear-gradient(180deg, rgba(248, 248, 248, 0.03) 0%, rgba(248, 248, 248, 0.24) 100%);
  color: ${({ isSelected }) => (isSelected ? '#4d4d4d' : '#b3b3b3')};
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

const DropdownList = styled.ul`
  box-sizing: border-box;
  height: ${(props)=>props.height ? props.height : "288px"};
  width: 280px;
  list-style: none;
  background-color: white;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  box-shadow: inset 0px -10px 20px rgba(0, 0, 0, 0.08);
  margin-top: 8px;
  &::-webkit-scrollbar {
    width: 50px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000; /* thumb 색상 */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const DropdownItem = styled.li`
  width: 280px;
  height: 48px;
  display: flex;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 600;
  color: #4d4d4d;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(248, 248, 248, 0.1) 0%, rgba(248, 248, 248, 0.8) 100%);
  border-bottom: 1px solid #B3B3B3;
  backdrop-filter: blur(50px);
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }

`;
 const ButtonText = styled.span`
   flex: 1;                 /* 남는 공간을 전부 차지하여 중앙 정렬 */
   text-align: ${({ isSelected }) => (isSelected ? "center" : "left")};
`;

const Dropdown = ({options,onSelect,selectedValue,height}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false); // 선택 시 드롭다운 닫기
  };
  const isSelected = selectedValue !== '선택';

  return (
    <DropdownContainer>
          <DropdownButton onClick={handleToggle} isSelected={isSelected}>
            <ButtonText isSelected={isSelected}>{selectedValue}</ButtonText>
            <img src="/assets/Admin/toggle-down.svg" alt="" />
          </DropdownButton>
      {isOpen && (
        <DropdownList height={height}>
          {options.map((item) => (
            <DropdownItem key={item} onClick={() => handleSelect(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
