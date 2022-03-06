import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-info',
  template: `
    <ng-container *ngIf="movie; else elseTemplate">
      <h3>Titolo: {{ movie.title }}</h3>
      <img
        src="http://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
        class="card-img-top"
        alt=""
      />
      <p>Trama: {{ movie.overview }}</p>
      <p>Data di uscita: {{ movie.release_date }}</p>
    </ng-container>
    <ng-template #elseTemplate>
      <p>Film non trovato</p>
    </ng-template>
  `,
  styles: [],
})
export class MovieInfoPage implements OnInit {
  movie: Movie | undefined;
  constructor(
    private router: ActivatedRoute,
    private movieSrv: MoviesService
  ) {}

  ngOnInit() {
    this.router.params.subscribe(async (params) => {
      const id = +params['id'];
      this.movie = await this.movieSrv.getMovie(id).toPromise();
    });
  }

}
