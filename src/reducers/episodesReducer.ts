import {
  EPISODES_LOAD,
  EPISODES_LOAD_SUCCESS,
  EPISODES_LOAD_FAIL,
} from '../actions/episodes';
import { EpisodeType } from '../constants/types';

type StateType = {
  items: EpisodeType[] | [];
  error: string | null;
  isLoading: boolean;
};

type ActionType = {
  type: string;
  episodes?: EpisodeType[];
  error?: string;
};

const episodesReducer = (
  state: StateType = {
    items: [],
    error: null,
    isLoading: false,
  },
  action: ActionType,
): StateType => {
  switch (action.type) {
    case EPISODES_LOAD: {
      return { ...state, error: null, isLoading: true };
    }
    case EPISODES_LOAD_SUCCESS: {
      const items = action?.episodes || [];
      return {
        items: [...state.items, ...items],
        error: null,
        isLoading: false,
      };
    }
    case EPISODES_LOAD_FAIL: {
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

export default episodesReducer;
