import { EpisodeType } from '../constants/types';

export const EPISODES_LOAD = 'EPISODES_LOAD';
export const EPISODES_LOAD_SUCCESS = 'EPISODES_LOAD_SUCCESS';
export const EPISODES_LOAD_FAIL = 'EPISODES_LOAD_FAIL';

export const loadEpisodes = (
  episodesUrls: string[],
): { type: typeof EPISODES_LOAD; episodesUrls: string[] } => ({
  type: EPISODES_LOAD,
  episodesUrls,
});

export const setEpisodes = (
  episodes: EpisodeType[],
): { type: typeof EPISODES_LOAD_SUCCESS; episodes: EpisodeType[] } => ({
  type: EPISODES_LOAD_SUCCESS,
  episodes,
});

export const setError = (
  error: string,
): { type: typeof EPISODES_LOAD_FAIL; error: string } => ({
  type: EPISODES_LOAD_FAIL,
  error,
});
