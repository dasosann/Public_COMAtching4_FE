import styled from "styled-components";

const P = {};

P.StyledDiv = styled.ul`
    list-style-position: inside; /* 리스트 마커를 li 내부로 설정 */
    text-align: left;
    font-size: 10px;
    padding-left: 0;
    color: #999;

    
  li {
    font-size: 10px;
    font-weight: 500;
    color: #999;
  }
  span {
    padding-bottom: 8px;
    font-weight: 600;
    color: #999;
    display: block;
  }
`;
P.BusinessInformation = styled.div`
    font-weight: 500;
    margin-top: 8px;
`
export default P;
