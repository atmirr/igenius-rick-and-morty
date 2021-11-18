import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const getEpisodes = (state: RootState) => state.episodes;

export const getEpisodesByUrls = (episodesUrls: string[]) =>
  createSelector(getEpisodes, (episodes) => {
    const items = episodesUrls?.reduce(
      (result: string[], episodeUrl: string) => {
        const episodeInfo = episodes.items?.find(
          ({ url }) => url === episodeUrl,
        );
        if (episodeInfo) {
          return [...result, episodeInfo.name];
        }
        return [...result];
      },
      [],
    );
    return { ...episodes, items };
  });

export const filterNonExistingEpisodes = (episodesUrls: string[]) =>
  createSelector(getEpisodes, (episodes) =>
    episodesUrls.filter((episodeUrl) => {
      const foundedItem = episodes.items.find(
        (episodeItem) => episodeItem.url === episodeUrl,
      );
      return foundedItem === undefined ? true : false;
    }),
  );
