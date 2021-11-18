import { createSelector } from 'reselect';
import { CharacterType } from '../constants/types';
import { RootState } from '../reducers';
import { StateType } from '../reducers/charactersReducer';

export const getCharacters = (state: RootState) => state.characters;

export const getFilteredCharacters = (query?: string) =>
  createSelector(getCharacters, (characters: StateType) => {
    return {
      ...characters,
      items: query
        ? characters.items?.filter(
            // Search the keyword between all the names of our characters
            // in the store in a "non case sensitive" way
            ({ name }) => name.toLowerCase().search(query.toLowerCase()) !== -1,
          )
        : characters.items,
    };
  });

export const filterNonExistingCharacters = (
  incomingCharacters: CharacterType[],
) =>
  createSelector(getCharacters, (existingCharacters: StateType) =>
    incomingCharacters.reduce(
      (result: CharacterType[] | [], incomingCharacter: CharacterType) => {
        const duplicateCharacter = existingCharacters.items.find(
          ({ id: existingId }) => existingId === incomingCharacter.id,
        );
        return duplicateCharacter
          ? [...result]
          : [...result, incomingCharacter];
      },
      [],
    ),
  );

export const getCharacter = (profileId: number) =>
  createSelector(getCharacters, (characters: StateType) => ({
    ...characters,
    items: characters.items?.filter(({ id }) => profileId === id),
  }));

export const getNextPageEndpoint = (query?: string) =>
  createSelector(getCharacters, (characters: StateType) =>
    query
      ? characters.nextPages.filtered[query]
      : characters.nextPages.unfiltered,
  );

export const hasMorePages = (query?: string) =>
  createSelector(getNextPageEndpoint(query), (nextPage) => nextPage !== null);
