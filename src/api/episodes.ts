import { API, ERROR_MESSAGES } from '../constants/application';
import { EpisodeType } from '../constants/types';

export const fetchEpisodes = async (
  episodesQueryString: string,
): Promise<EpisodeType[] | Error> => {
  const baseUrl = API.EPISODES_URL;
  const endpoint = episodesQueryString
    ? `${baseUrl}/${episodesQueryString}`
    : baseUrl;
  const response = await fetch(endpoint);
  const data = await response.json();
  if (response.status >= 400) {
    // Handle custom error messages
    if (ERROR_MESSAGES?.[response.status]) {
      throw new Error(ERROR_MESSAGES?.[response.status]);
    }
    throw new Error(data.errors);
  }
  return data;
};
