import { style } from "@vanilla-extract/css";
import styled from "styled-components";
const E= {};
E.ComponentWrapper = styled.div`
    width: 100%;
    height: 95px;
    font-family: "Pretendard", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 0 16px 0;
    box-sizing: border-box;
    align-items: start;
`
E.TimeText= styled.div`
    font-weight: 500;
    font-size: 12px;
    color: #000;
`
E.BodyWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
E.BodyText = styled.div`
    color: #000;
    font-size: 16px;
    font-weight: 600;
`
E.StatusText= styled.div`
    color: #999;
    font-size: 12px;
    font-weight: 600;
`
export default E;