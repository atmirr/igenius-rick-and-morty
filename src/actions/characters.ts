import { CharacterType, CharactersRespondType } from '../constants/types';
export const CHARACTER_LOAD = 'CHARACTER_LOAD';
export const CHARACTER_LOAD_SUCCESS = 'CHARACTER_LOAD_SUCCESS';
export const CHARACTER_LOAD_FAIL = 'CHARACTER_LOAD_FAIL';

export const CHARACTERS_LOAD = 'CHARACTERS_LOAD';
export const CHARACTERS_LOAD_SUCCESS = 'CHARACTERS_LOAD_SUCCESS';
export const CHARACTERS_LOAD_FAIL = 'CHARACTERS_LOAD_FAIL';

export const loadCharacter = (
  id: number,
): { id: number; type: typeof CHARACTER_LOAD } => ({
  type: CHARACTER_LOAD,
  id,
});

export const setCharacter = (
  character: CharacterType,
): { type: typeof CHARACTER_LOAD_SUCCESS; character: CharacterType } => ({
  type: CHARACTER_LOAD_SUCCESS,
  character,
});

export const loadCharacters = (
  query?: string,
): { type: typeof CHARACTERS_LOAD; query?: string } => ({
  type: CHARACTERS_LOAD,
  query,
});

export const setCharacters = (
  characters: CharactersRespondType,
  query?: string,
): {
  type: typeof CHARACTERS_LOAD_SUCCESS;
  characters: CharactersRespondType;
  query?: string;
} => ({
  type: CHARACTERS_LOAD_SUCCESS,
  characters,
  query,
});

export const setError = (
  error: string,
): { type: typeof CHARACTERS_LOAD_FAIL; error: string } => ({
  type: CHARACTERS_LOAD_FAIL,
  error,
});
