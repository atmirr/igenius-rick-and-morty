import {
  CHARACTER_LOAD,
  CHARACTER_LOAD_SUCCESS,
  CHARACTER_LOAD_FAIL,
  CHARACTERS_LOAD,
  CHARACTERS_LOAD_SUCCESS,
  CHARACTERS_LOAD_FAIL,
} from '../actions/characters';
import { CharacterType, CharactersRespondType } from '../constants/types';

export type StateType = {
  items: CharacterType[] | [];
  nextPages: {
    unfiltered?: string | null;
    filtered: {
      [query: string]: string | null;
    };
  };
  error: string | null;
  isLoading: boolean;
};

type ActionType = {
  type: string;
  query?: string;
  character?: CharacterType;
  characters?: CharactersRespondType;
  error?: string;
};

const charactersReducer = (
  state: StateType = {
    items: [],
    nextPages: {
      unfiltered: undefined,
      filtered: {},
    },
    error: null,
    isLoading: false,
  },
  action: ActionType,
): StateType => {
  switch (action.type) {
    case CHARACTER_LOAD: {
      return { ...state, error: null, isLoading: true };
    }
    case CHARACTERS_LOAD: {
      return { ...state, error: null, isLoading: true };
    }
    case CHARACTER_LOAD_SUCCESS: {
      if (action.character) {
        return {
          ...state,
          items: [...state.items, action.character],
          error: null,
          isLoading: false,
        };
      }
      return state;
    }
    case CHARACTERS_LOAD_SUCCESS: {
      const { query, characters } = action;
      const items = characters?.results;
      const nextPageEndpoint = action?.characters?.info?.next || null;
      const nextPages = { ...state.nextPages };
      // Set the nextPages endpoint for each keyword separately
      if (query) {
        nextPages.filtered[query] = nextPageEndpoint;
      } else {
        nextPages.unfiltered = nextPageEndpoint;
      }
      if (items) {
        return {
          items: [...state.items, ...items],
          nextPages,
          error: null,
          isLoading: false,
        };
      }
      return { ...state, isLoading: false };
    }
    case CHARACTER_LOAD_FAIL:
    case CHARACTERS_LOAD_FAIL: {
      const error = action.error || null;
      return {
        ...state,
        error,
        isLoading: false,
      };
    }
  }
  return state;
};

export default charactersReducer;
