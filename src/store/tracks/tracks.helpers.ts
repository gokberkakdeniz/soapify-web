// eslint-disable-next-line import/prefer-default-export
export const getPlaylistTracksUrl = (
  playlistId: string,
  market: string,
  page: number,
): string => {
  return `/playlists/${playlistId}/items?market=${market}&offset=${
    page * 100
  }&limit=100&fields=items(added_at,item(name,uri,album(name,artists)))`;
};
