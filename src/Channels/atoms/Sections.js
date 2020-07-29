import React from "react";
import { SectionList } from "react-native";
import styled from "styled-components";
import { APP_WHITE_COLOR, BACKGROUND_COLOR } from "../../constants";

const SectionHeader = styled.Text`
  color: ${APP_WHITE_COLOR};
  text-transform: capitalize;
  font-size: 16px;
  font-family: "Montserrat-Bold";
  margin-bottom: 16px;
  letter-spacing: 1px;
  background-color: ${BACKGROUND_COLOR};
`;

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>;
}

export function Sections({ data, renderItem, onScroll }) {
  return (
    <SectionList
      sections={data}
      keyExtractor={(item) => item.$.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onScroll={onScroll}
      stickySectionHeadersEnabled
    />
  );
}
