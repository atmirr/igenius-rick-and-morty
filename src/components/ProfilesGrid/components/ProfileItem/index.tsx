import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { CharacterType } from 'src/constants/types';

import ProfileCard from 'src/components/ProfileCard';

const Link = styled(RouterLink)`
  text-decoration: none;
  color: #252525;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #252525;
  }
`;

type PropTypes = Pick<CharacterType, 'id' | 'name' | 'image'>;

function ProfileItem({ id, name, image }: PropTypes): React.ReactElement {
  return (
    <Link to={`profile/${id}`} data-testid="profile-item">
      <ProfileCard name={name} image={image} />
    </Link>
  );
}

export default ProfileItem;
