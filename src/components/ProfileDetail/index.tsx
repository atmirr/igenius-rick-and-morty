import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCharacter } from 'src/actions/characters';
import { loadEpisodes } from 'src/actions/episodes';
import { getEpisodesByUrls } from 'src/selectors/episodes';
import { getCharacter } from 'src/selectors/characters';
import ProfileCard from '../ProfileCard';
import Error from '../Error';

const BackButton = styled(Link)`
  position: absolute;
  margin-top: 20px;
  border: 2px solid #787878;
  padding: 6px 16px;
  left: 100px;
  font-size: 14pt;
  text-decoration: none;
  color: #3f3f3f;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #3f3f3f;
  }
`;

function ProfileDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const profileId = Number(params.profileId);

  const {
    items: [characters],
    isLoading: charactersIsLoading,
    error: charactersError,
  } = useSelector(getCharacter(profileId));

  const episodesUrls = characters?.episode;
  const {
    items: episodes,
    isLoading: episodesIsLoading,
    error: episodesError,
  } = useSelector(getEpisodesByUrls(episodesUrls));

  const error = charactersError || episodesError;

  useEffect(() => {
    // Check if we already have character's details in our store
    if (isEmpty(characters) && !charactersIsLoading && !charactersError) {
      // If we didn't find character's details then we fetch it!
      dispatch(loadCharacter(profileId));
    }

    // Check if we already have episode's details in our store
    if (
      isEmpty(episodes) &&
      episodesUrls &&
      !episodesIsLoading &&
      !episodesError
    ) {
      // If we didn't find episode's details then we fetch it!
      dispatch(loadEpisodes(episodesUrls));
    }
  }, [
    dispatch,
    characters,
    charactersIsLoading,
    charactersError,
    profileId,
    episodes,
    episodesUrls,
    episodesIsLoading,
    episodesError,
  ]);

  return (
    <>
      <BackButton to="/">{'<Back'}</BackButton>
      {characters && (
        <ProfileCard
          fullscreen
          name={characters?.name}
          image={characters?.image}
          species={characters?.species}
          status={characters?.status}
          gender={characters?.gender}
          locationName={characters?.location?.name}
          originName={characters?.origin?.name}
        />
      )}
      {error && <Error error={error} />}
    </>
  );
}

export default ProfileDetail;
