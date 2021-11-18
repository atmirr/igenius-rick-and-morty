import { call, debounce, takeLatest, put, select } from 'redux-saga/effects';
import { API } from '../constants/application';
import { CharacterType, CharactersRespondType } from '../constants/types';
import { fetchCharacters } from '../api/characters';
import {
  CHARACTER_LOAD,
  CHARACTERS_LOAD,
  setCharacter,
  setCharacters,
  setError,
} from '../actions/characters';
import {
  filterNonExistingCharacters,
  getNextPageEndpoint,
  hasMorePages as hasMorePagesSelector,
} from '../selectors/characters';

export function* handleCharacterLoad(action: {
  type: typeof CHARACTER_LOAD;
  id: number;
}) {
  const { id: characterId } = action;
  try {
    const endpoint = `${API.CHARACTERS_URL}/${characterId}`;
    const character: CharacterType = yield call(fetchCharacters, endpoint);
    yield put(setCharacter(character));
  } catch (error) {
    let errorMessage = 'Failed to throw an error!';
    // We're making sure whether our error is a type of
    // Error object or not
    if (error instanceof Error) {
      errorMessage = error.toString();
    }
    yield put(setError(errorMessage));
  }
}

export function* handleCharactersLoad(action: {
  type: typeof CHARACTERS_LOAD;
  query?: string;
}) {
  const { query } = action;
  try {
    const nextPageEndpoint: string = yield select(getNextPageEndpoint(query));
    const hasMorePages: boolean = yield select(hasMorePagesSelector(query));
    const defaultEndPoint = `${API.CHARACTERS_URL}${
      query ? `/?name=${query}` : ''
    }`;
    const endpoint = nextPageEndpoint || defaultEndPoint;
    if (hasMorePages) {
      const incomingCharacters: CharactersRespondType = yield call(
        fetchCharacters,
        endpoint,
      );
      // Get rid of the characters we already have them in the store
      // to prevent saving duplicated items
      const newCharacters: CharacterType[] = yield select(
        filterNonExistingCharacters(incomingCharacters?.results),
      );
      yield put(
        setCharacters({ ...incomingCharacters, results: newCharacters }, query),
      );
    }
  } catch (error) {
    let errorMessage = 'Failed to throw an error!';
    // We're making sure whether our error is a type of
    // Error object or not
    if (error instanceof Error) {
      errorMessage = error.toString();
    }
    yield put(setError(errorMessage));
  }
}

export default function* watchCharactersLoad() {
  // Gives a 1000ms delay for providing a better UX
  yield debounce(1000, CHARACTERS_LOAD, handleCharactersLoad);
  yield takeLatest(CHARACTER_LOAD, handleCharacterLoad);
}
