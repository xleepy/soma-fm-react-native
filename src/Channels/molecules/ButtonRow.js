import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 0;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export function ButtonRow({ currentType, dispatch }) {
  const handleFavoritePress = () => {
    dispatch("favorite");
  };

  const handleAllPress = () => {
    dispatch("all");
  };

  const handleByGenrePress = () => {
    dispatch("genre");
  };
  const hanleByPopularityPress = () => {
    dispatch("popularity");
  };

  return (
    <Container>
      <Button
        isActive={currentType === "favorite"}
        onPress={handleFavoritePress}
        label="Favourite"
      />
      <Button
        isActive={currentType === "all"}
        onPress={handleAllPress}
        label="All"
      />
      <Button
        isActive={currentType === "genre"}
        onPress={handleByGenrePress}
        label="By genre"
      />
      <Button
        isActive={currentType === "popularity"}
        onPress={hanleByPopularityPress}
        label="By Popularity"
      />
    </Container>
  );
}
