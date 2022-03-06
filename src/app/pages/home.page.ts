import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container-fluid d-flex text-white text-center">
      <div class="card bg-dark border-white" style="width: 50rem">
        <img
          src="../../assets/mr-robot.jpg"
          class=" img-thumbnail img-fluid w-100 mx-auto"
          alt="mrRobot"
        />
        <div class="card-body">
          <h1 class="card-title text-info fw-bold">
            Movieland<br /><span class="h2"
              >Tutti i tuoi film preferiti sono qui!</span
            >
          </h1>
          <p class="card-text fs-4">
            Accedi subito o registrati gratuitamente per iniziare a guardare
          </p>
          <a
            class="btn btn-primary fs-4 mt-3 w-25"
            [routerLink]="['/login']"
            routerLinkActive="active"
            >Accedi</a
          >
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container-fluid {
        position: relative;
        left: 5vw;
        margin: 0 auto;
        justify-content: center;
      }
      .card {
        position: relative;
        top: 10vh;
        left: 3vw;
      }
    `,
  ],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
