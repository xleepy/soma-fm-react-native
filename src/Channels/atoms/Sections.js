import React from "react";
import { SectionList, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";
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

const AnimatedSection = Animated.createAnimatedComponent(SectionList);

export function Sections({ data, renderItem, isFetching, onRefresh, ...rest }) {
  return (
    <AnimatedSection
      {...rest}
      sections={data}
      keyExtractor={(item) => item.$.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    />
  );
}
