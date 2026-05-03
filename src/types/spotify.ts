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
  images?: Array<{ url: string; height: number; width: number }>;
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

export interface ArtistDetailObject {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  genres: string[];
  popularity: number;
  external_urls: { spotify: string };
}

export interface ArtistsResponse {
  artists: ArtistDetailObject[];
}
