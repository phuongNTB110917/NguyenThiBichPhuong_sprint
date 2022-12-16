import { CategoryFilm } from './category-film';
import {FilmImg} from './film-img';
import {Category} from './category';
import {SeatDetail} from './seat-detail';


export interface Film {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  actor: string;
  director: string;
  duration: string;
  trailer: string;
  studioName: string;
  content: string;
  version: string;
  img: string;
  categoryFilms: CategoryFilm[];
  filmImgs: FilmImg[];
  seatDetails: SeatDetail[];
}
