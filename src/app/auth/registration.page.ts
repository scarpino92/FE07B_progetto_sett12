import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div class="container-fluid register">
      <form #form="ngForm" (ngSubmit)="onsubmit(form)">
        <div class="form-group">
          <label for="name" class="text-white fs-4">Nome Completo</label>
          <input
            name="name"
            required
            ngModel
            class="form-control"
            id="name"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="email" class="text-white fs-4">Email</label>
          <input
            name="email"
            class="form-control"
            required
            ngModel
            id="email"
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="pass" class="text-white fs-4">Password</label>
          <input
            name="password"
            class="form-control"
            required
            ngModel
            id="pass"
            type="password"
          />
        </div>
        <div class="d-flex align-items-center">
          <button
            type="submit"
            [disabled]="form.invalid"
            class="btn btn-primary mt-4 fs-5"
          >
            Registrati
            <span
              *ngIf="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
            ></span>
          </button>
          <div class="mt-3">
            <span class="text-white fs-5 mx-3"
              >oppure
              <a
                [routerLink]="['/login']"
                routerLinkActive="active"
                class="log"
                >Fai il login</a
              ></span
            >
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .register {
        position: relative;
        top: 30vh;
        left: 5vw;
        width: 40vw;
        border: 1px solid white;
        padding: 40px;
        border-radius: 10px;
      }
      input {
        font-size: 20px;
      }
      .log {
        text-decoration: none;
      }
    `,
  ],
})
export class RegistrationPage implements OnInit {
  isLoading = false;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
  async onsubmit(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.registration(form.value).toPromise();
      this.router.navigate(['/login']);
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      alert(error);
      form.reset();
      this.isLoading = false;
    }
  }
}
