import React, { useCallback } from "react";
import { Button } from "../atoms/Button";
import styled from "styled-components";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 0;
  margin-bottom: 10px;
`;

export function ButtonRow({ currentType, dispatch }) {
  const handleAllPress = useCallback(() => {
    dispatch("all");
  }, [dispatch]);

  const handleByGenrePress = useCallback(() => {
    dispatch("genre");
  }, [dispatch]);

  const hanleByPopularityPress = useCallback(() => {
    dispatch("popularity");
  }, [dispatch]);
  return (
    <Container>
      <Button label="Favourite" />
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
