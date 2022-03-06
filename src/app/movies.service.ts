import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './models/movie.model';
import { AuthData, AuthService } from './auth/auth.service';
import { Favourite } from './models/favourite.models';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[] | undefined;
  preferiti: Movie[] = [];
  mUrl = 'http://localhost:4200/api/movies-popular';
  fUrl = 'http://localhost:4200/api/favorites';
  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getMovies() {
    return this.http.get<Movie[]>(this.mUrl);
  }

  getMovie(id: number) {
    return this.http.get<Movie>(`${this.mUrl}/${id}`);
  }

  async getFavourite(){
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;

    const fav = await this.http
      .get<Favourite[]>(`${this.fUrl}?userId=${user.user.id}`)
      .toPromise();
    return fav;
  }

  async addFavourite(movie: Movie) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.preferiti.push(movie);
    movie.like = true;
    let count = 0;
    const data: Favourite = {
      movieId: movie.id,
      userId: user.user.id,
      id: count++,
    };
    return this.http.post<Favourite>(`${this.fUrl}`, data);
  }
  async removeFavorite(id: number) {
    return this.http.delete(`${this.fUrl}/${id}`);
  }
}
