import styled from "styled-components";
import React, { useCallback } from "react";
import { TouchableHighlight } from "react-native";

const FavoriteIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const IconContainer = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const favoriteIconInActive = require("../../../assets/icons/favorite-inactive.png");
const favoriteIconActive = require("../../../assets/icons/favorite-active.png");

export function FavoriteIconBtn({ onFavoritePress, isFavorite, channelId }) {
  const favoriteIcon = isFavorite ? favoriteIconActive : favoriteIconInActive;
  const handleFavoritePress = useCallback(
    (event) => {
      event.preventDefault();
      onFavoritePress(channelId);
    },
    [onFavoritePress, channelId]
  );
  return (
    <TouchableHighlight onPress={handleFavoritePress}>
      <IconContainer>
        <FavoriteIcon source={favoriteIcon} />
      </IconContainer>
    </TouchableHighlight>
  );
}
