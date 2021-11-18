import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import usePageBottom from 'src/utils/use-page-bottom';
import { loadCharacters } from 'src/actions/characters';
import {
  getFilteredCharacters,
  hasMorePages as hasMorePagesSelector,
} from 'src/selectors/characters';
import styled from 'styled-components';
import { CharacterType } from 'src/constants/types';
import Error from 'src/components/Error';
import ProfilePlaceholders from './components/ProfilePlaceholders';
import ProfileItem from './components/ProfileItem';

const Grid = styled.div`
  padding: 30px 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type PropTypes = {
  keyword?: string;
};

function ProfilesGrid({ keyword = '' }: PropTypes): React.ReactElement {
  const dispatch = useDispatch();
  const characters = useSelector(getFilteredCharacters(keyword));
  const { items, isLoading, error } = characters;
  // Check if there is more character left to fetch in order to
  // toggle displaying placeholders
  const hasMorePages = useSelector(hasMorePagesSelector(keyword));
  const isPageBottom = usePageBottom();
  useEffect(() => {
    // Check if it is necessary to fetch some more loadCharacters
    // In case of we are showing less than 10 characters OR
    // We're reaching on the bottom of the page
    if (
      (items.length < 10 || isPageBottom) &&
      hasMorePages &&
      !isLoading &&
      !error
    ) {
      // Load characters when component has been just mounted OR
      // When we are showing less than 10 characters OR
      // while we reach at the bottom of the page
      dispatch(loadCharacters(keyword));
    }
  }, [items, keyword, hasMorePages, isLoading, error, isPageBottom, dispatch]);

  return (
    <Grid data-testid="profiles-grid">
      {!isEmpty(items) &&
        items.map(
          ({
            id,
            name,
            image,
          }: Pick<CharacterType, 'id' | 'name' | 'image'>) => (
            <ProfileItem key={id} id={id} name={name} image={image} />
          ),
        )}
      {isLoading && hasMorePages && <ProfilePlaceholders count={20} />}
      {error && <Error error={error} />}
    </Grid>
  );
}

export default ProfilesGrid;
