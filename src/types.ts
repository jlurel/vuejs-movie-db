export interface MovieDbData {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieDbObject[];
}

export type MovieDbObject = Movie | TVShow | Person;

export interface OneOf {
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShow extends OneOf {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface Movie extends OneOf {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface Person {
  adult: boolean;
  profile_path: string;
  id: number;
  known_for: Movie[] | TVShow[];
  name: string;
  popularity: number;
}

export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Credits {
  id: number;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country: string[];
  original_name?: string;
  vote_count: number;
  name?: string;
  media_type: string;
  popularity: number;
  credit_id: string;
  backdrop_path?: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path?: string;
  original_title?: string;
  video: boolean;
  title?: string;
  adult: boolean;
  release_date: string;
  release_year: string;
}

export interface CrewCredits extends Credits {
  department: string;
}

export interface Option {
  title: string;
  value: string;
}

export interface CreditsGroupedByDate {
  release_year: string;
  credits: Credits[];
}
