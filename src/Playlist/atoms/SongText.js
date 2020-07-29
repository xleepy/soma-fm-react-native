import React from "react";
import styled from "styled-components";

const StyledText = styled.Text`
 font-family: ${({ type }) =>
   type === "primary" ? "Montserrat-Bold" : "Montserrat-Regular"};
 font-style: normal;
 font-weight: ${({ type }) => (type === "primary" ? "bold" : "500")}
 font-size: 14px;
 line-height: 17px;
 opacity: ${({ type }) => (type === "primary" ? "1" : "0.6")}
 color: #fff;
 margin-bottom: ${({ type }) => (type === "primary" ? "4px" : "7px")};

`;

export function SongText({ type, children }) {
  return <StyledText type={type}>{children}</StyledText>;
}
