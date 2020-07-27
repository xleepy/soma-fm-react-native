import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-shrink: 1;
`;

const Title = styled.Text`
  color: #fff;
  font-family: "Montserrat-Bold";
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 2px;
`;

const StyledText = styled.Text`
  font-family: "Montserrat-SemiBold";
  color: #999999;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 4px;
`;

export function TextContent({ title, listeners, description }) {
  return (
    <Container>
      <Title>{title}</Title>
      <StyledText>{`Listeners: ${listeners}`}</StyledText>
      <StyledText>{description}</StyledText>
    </Container>
  );
}
