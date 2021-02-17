export interface ErrorObject {
  error: {
    status: number;
    message: string;
  };
}
export interface UserObject {
  display_name: string;
  id: string;
  type: string;
  uri: string;
  country: string;
}

export interface PlaylistObject {
  href: string;
  id: string;
  name: string;
  owner: UserObject;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  uri: string;
}

export interface ArtistObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface TrackObject {
  album: {
    artists: ArtistObject[];
    name: string;
  };
  name: string;
  uri: string;
  added_at: string;
}
