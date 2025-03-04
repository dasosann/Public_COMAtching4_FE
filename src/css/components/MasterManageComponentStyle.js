import { style } from "@vanilla-extract/css";
import styled from "styled-components";
const M = {};

M.MasterContainer= styled.div`
    display: grid;
    grid-template-columns: 636fr 428fr ;
    grid-template-rows:1fr 1fr 1fr ;
    height: 383px;
    gap: 16px;
    font-family: "Pretendard", sans-serif;
    width: 100%;
`
M.EachContainer = styled.div`
    background-color: #ffffff;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.3);
    width: 100%;
    box-shadow: 1px 1px 20px 1px rgba(196,196,196,0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding: 24px 0 24px 24px ;
    box-sizing: border-box;
    gap: 8px;
    cursor: pointer;
    min-width: 317px;
`
M.TitleText= styled.div`
    font-size:32px;
    font-weight: 700;
    color: #000;
`
M.ContentText= styled.div`
    font-size:16px ;
    font-weight: 500;
    color: #858585;
`
export default M;