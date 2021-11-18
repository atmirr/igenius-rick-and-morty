import { combineReducers } from 'redux';
import charactersReducer from './charactersReducer';
import episodesReducer from './episodesReducer';

const rootReducer = combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
