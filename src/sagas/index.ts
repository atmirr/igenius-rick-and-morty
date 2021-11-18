import { all } from 'redux-saga/effects';
import charactersSaga from './charactersSaga';
import episodesSaga from './episodesSaga';

export default function* rootSaga() {
  yield all([charactersSaga(), episodesSaga()]);
}
