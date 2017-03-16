// Netflix api response entity
export interface NetflixApiResponse {
  unit: number;
  show_id: number;
  show_title: string;
  release_year: number;
  rating: number;
  category: string;
  show_cast: string;
  director: string;
  summary: string;
  poster: string;
  mediatype: number;
  runtime: string
}
