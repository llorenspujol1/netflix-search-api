import { HttpService } from './http/http.service';
import { NetflixService } from './netflix/netflix.service';
import { NetflixApiResponse } from './netflix/netflix.entities';

export { HttpService } from './http/http.service';
export { NetflixService } from './netflix/netflix.service';
export { NetflixApiResponse } from './netflix/netflix.entities';

export const APP_SERVICES = [
  HttpService,
  NetflixService
];
