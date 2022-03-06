import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { MovieInfoPage } from './movie-info.page';

@Component({
  selector: 'app-movies',
  template: `
    <div class="container-fluid grid-container">
      <div *ngFor="let m of movies; let i = index" class="card grid-item">
        <img
          src="http://image.tmdb.org/t/p/w500{{ m.poster_path }}"
          class="card-img-top"
          alt=""
        />
        <div class="card-body">
          <h5 class="card-title fs-5 fw-bold">{{ m.title }}</h5>
          <hr />
          <button
            type="button"
            *ngIf="!m.like"
            (click)="addFav(m)"
            class="btn btn-primary me-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart me-1"
              id="heart"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
            Preferiti
          </button>
          <button
            type="button"
            *ngIf="m.like"
            (click)="removeFav(m)"
            class="btn btn-primary me-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            Preferiti
          </button>
          <span class="fs-5 mx-2">Voto: {{ m.vote_average }}</span>
          <!-- non sono riuscita a far funzionare la pagina per i dettagli del film così ho aggiunto un alert-->
          <i
            class="bi bi-info-circle fs-5 ms-4 text-primary info"
            [routerLink]="[m.id]"
            routerLinkActive="active"
            (click)="info(m.title, m.overview, m.release_date)"
            ><a></a
          ></i>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container-fluid {
        position: relative;
      }
      .grid-container {
        width: 70%;
        display: grid;
        column-gap: 0px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 10px;
        margin-left: 24vw;
      }
      .grid-item {
        width: 15vw;
        height: auto;
        margin: 10px 0;
      }
      .info {
        cursor: pointer;
      }
      .bi-heart {
      }
    `,
  ],
})
export class MoviesPage implements OnInit {
  movies!: Movie[];
  index!: Movie;
  idUtente!: string;
  liked: boolean = false;

  constructor(public movieSrv: MoviesService, public authSrv: AuthService) {}

  ngOnInit(): void {
    this.movieSrv.getMovies().subscribe((result) => {
      this.movies = result;
      this.movieSrv.getFavourite().then((resultFav: any) => {
        if (resultFav !== undefined) {
          this.movies.forEach((m) => {
            const favorite = resultFav.find((fav: any) => fav.movieId === m.id);
            m.like = favorite !== undefined;
            if (favorite) {
              m.favId = favorite.id;
            }
          });
        }
      });
    });
  }

  info(title: string, overview: string, release_date: string) {
    alert(
      `Titolo: ${title} \n \n Trama: ${overview} \n \n Data di uscita: ${release_date}`
    );
  }

  async addFav(movie: Movie) {
    await (await this.movieSrv.addFavourite(movie)).toPromise();
    movie.like = true;
  }
  async removeFav(movie: Movie) {
    await (await this.movieSrv.removeFavorite(movie.favId)).toPromise();
    movie.like = false;
  }
}
