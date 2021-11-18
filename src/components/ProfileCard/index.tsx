import React from 'react';
import styled from 'styled-components';
import { CharacterType } from 'src/constants/types';
import GenericItems from './components/GenericItems';
import DetailItem from './components/DetailItem';
import EpisodesItem from './components/EpisodesItem';

const Container = styled.div<{ fullscreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: ${(props) => (props.fullscreen ? '330px' : '230px')};
  text-align: center;
  padding: 1.3em 1.3em 0.5em 1.3em;
  margin: ${(props) => `1.1em ${props.fullscreen ? 'auto' : '0.9em'}`};
  border-radius: 15px;
  box-shadow: 0 0 6px 4px #e3e3e3;
  transition: all 300ms ease-out;
  &:hover {
    box-shadow: 0 0 14px 2px #aaaaaa;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 15px;
  & img {
    border-radius: 15px;
  }
`;
const InformationWrapper = styled.div<{ fullscreen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: left;
  padding: 20px 0 10px 0;
  height: ${(props) => (props.fullscreen ? '150px' : '50px')};
`;

const Name = styled.span`
  font-size: 20px;
  padding-bottom: 2px;
  text-align: center;
`;

const DetailItems = styled.div`
  padding: 2px 0;
`;

type PropTypes = Partial<CharacterType> & {
  fullscreen?: boolean;
  episodes?: string[];
  locationName?: string;
  originName?: string;
};

function ProfileCard({
  fullscreen = false,
  name,
  species,
  status,
  gender,
  image,
  episodes,
  locationName,
  originName,
}: PropTypes): React.ReactElement {
  return (
    <Container data-testid="profile-card" fullscreen={fullscreen}>
      <ImageWrapper>
        <img
          src={image}
          alt={name}
          width={fullscreen ? 280 : 220}
          height={fullscreen ? 280 : 220}
        />
      </ImageWrapper>
      <InformationWrapper fullscreen={fullscreen}>
        <Name>{name}</Name>
        {fullscreen && (
          <>
            <GenericItems species={species} status={status} gender={gender} />
            <DetailItems>
              {locationName && (
                <DetailItem label="Location">{locationName}</DetailItem>
              )}
              {originName && (
                <DetailItem label="Origin">{originName}</DetailItem>
              )}
            </DetailItems>
            {episodes && <EpisodesItem>{episodes}</EpisodesItem>}
          </>
        )}
      </InformationWrapper>
    </Container>
  );
}

export default ProfileCard;
