import React from "react";
import { SectionList } from "react-native";
import { Channel } from "../../Channel/organisms/Channel";
import styled from "styled-components";

const SectionHeader = styled.Text`
  color: #fff;
  text-transform: capitalize;
  font-size: 16px;
  font-family: "Montserrat-Bold";
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

function renderItem({ item }) {
  return <Channel key={item.$.id} channel={item} />;
}

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>;
}

export function Sections({ data }) {
  return (
    <SectionList
      sections={data}
      keyExtractor={(item) => item.$.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
}
