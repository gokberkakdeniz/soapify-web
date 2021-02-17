// eslint-disable-next-line import/prefer-default-export
export const getPlaylistTracksUrl = (
  playlistId: string,
  market: string,
  page: number
): string => {
  return `/playlists/${playlistId}/tracks?market=${market}&offset=${
    page * 100
  }&limit=100&fields=items(added_at,track(name,uri,album(name,artists)))`;
};
