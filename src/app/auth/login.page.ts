import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div class="container-fluid login">
      <form #form="ngForm" (ngSubmit)="accedi(form)">
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
            required
            class="form-control"
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
            Accedi
          </button>
          <div class="mt-3">
            <span class="text-white fs-5 mx-3"
              >oppure
              <a [routerLink]="['/registration']" routerLinkActive="active"
              class="reg"
                >Registrati</a
              ></span
            >
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .login {
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
      .reg{
        text-decoration: none;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  isLoading = false;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async accedi(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.login(form.value).toPromise();
      this.isLoading = false;
      this.router.navigate(['/movies']);
    } catch (error) {
      this.isLoading = false;
      form.reset();
      alert(error);
      console.error(error);
    }
  }
}
