import { call, takeLatest, put, select } from 'redux-saga/effects';
import { isEmpty, uniq } from 'lodash';
import { EpisodeType } from '../constants/types';
import { fetchEpisodes } from '../api/episodes';
import { setEpisodes, setError } from '../actions/episodes';
import { EPISODES_LOAD } from '../actions/episodes';
import { filterNonExistingEpisodes } from '../selectors/episodes';
import generateIdsByUrls from '../utils/generate-ids-by-urls';

export function* handleAllEpisodesLoad(action: {
  type: typeof EPISODES_LOAD;
  episodesUrls: string[];
}) {
  const { episodesUrls } = action;
  // Filter the new episodes which we don't already have them in the store
  // to prevent the duplicate items
  const nonExistingEpisodesUrls: string[] = yield select(
    filterNonExistingEpisodes(episodesUrls),
  );
  const episodeIds = generateIdsByUrls(nonExistingEpisodesUrls);
  const uniqueEpisodeIds = uniq(episodeIds);
  const episodesQueryString = uniqueEpisodeIds.join(',');
  if (!isEmpty(uniqueEpisodeIds)) {
    try {
      const episodes: EpisodeType[] = yield call(
        fetchEpisodes,
        episodesQueryString,
      );
      yield put(setEpisodes(episodes));
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
}

export default function* watchEpisodesLoad() {
  yield takeLatest(EPISODES_LOAD, handleAllEpisodesLoad);
}
