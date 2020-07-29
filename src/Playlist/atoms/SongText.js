import React from "react";
import styled from "styled-components";
import { APP_WHITE_COLOR } from "../../constants";

const StyledText = styled.Text`
 font-family: ${({ type }) =>
   type === "primary" ? "Montserrat-Bold" : "Montserrat-Regular"};
 font-style: normal;
 font-weight: ${({ type }) => (type === "primary" ? "bold" : "500")}
 font-size: 14px;
 line-height: 17px;
 opacity: ${({ type }) => (type === "primary" ? "1" : "0.6")}
 color: ${APP_WHITE_COLOR};
 margin-bottom: ${({ type }) => (type === "primary" ? "4px" : "0px")};

`;

export function SongText({ type, children }) {
  return <StyledText type={type}>{children}</StyledText>;
}
