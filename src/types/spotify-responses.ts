export interface ImageObject {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrlsObject {
  spotify: string
}

export interface SimplifiedArtist {
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string
}

export interface CopyrightObject {
  text: string;
  type: string;
}

export interface Restrictions {
  reason: string;
}

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: { external_urls: ExternalUrlsObject; href: string; id: string; type: string; uri: string }
  restrictions?: Restrictions;
  name: string;
  preview_url: null | string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean
}



export interface AlbumSearchItem {
  album_type: "single" | "album" | "compilation";
  artists: { external_urls: ExternalUrlsObject, href: string, id: string, name: string, type: string, uri: string }[];
  available_markets: string[];
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  restrictions?: Restrictions
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  type: "album";
  uri: string;
}

export interface AlbumSearchResponse {
  albums: {
    href: string;
    items: AlbumSearchItem[]
    limit: number;
    next: null | string;
    offset: number;
    previous: null | string;
    total: number
  }
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
  tracks: { href: string; limit: number; next: null | string; offset: number; previous: null | string; total: number; items: SimplifiedTrack[] }
  copyrights: CopyrightObject[];
  external_ids: { isrc: string; ean: string; upc: string };
  genres: [] | string[];
  label: string;
  popularity: number;
}

export interface ArtistFollowersObject {
  href: null | string
  total: number
}
export interface ArtistSearchItem {
  external_urls: ExternalUrlsObject
  followers: ArtistFollowersObject
  genres: string[]
  href: string
  id: string
  images: ImageObject[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ArtistSearchResponse {
  artists: {
    href: string
    limit: number
    next: null | string
    offset: number
    previous: null | string
    total: number
    items: ArtistSearchItem[]
  }
}

export interface Artist {
  exteneral_urls: ExternalUrlsObject
  followers: ArtistFollowersObject
  genres: string[]
  href: string
  id: string
  images: ImageObject[]
  name: string
  popularity: number
  type: string
  uri: string
}