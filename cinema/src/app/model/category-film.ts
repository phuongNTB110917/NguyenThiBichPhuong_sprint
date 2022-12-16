import {Category} from './category';
import {Film} from './film';

export interface CategoryFilm {
  id: number;
  category_id: Category;
  film_id: Film;
}
