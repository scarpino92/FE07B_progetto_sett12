import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container-fluid d-flex text-white">
      <div class="profile fs-3 mt-5 text-center" *ngIf="user$ | async as user">
        <p>
          Nome utente: <span class="text-info">{{ user.user.name }}</span>
        </p>
        <p>
          Email: <span class="text-info">{{ user.user.email }}</span>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .container-fluid {
        position: relative;
      }
      .profile {
        margin: 0 auto;
        justify-content: center;
      }
    `,
  ],
})
export class ProfilePage implements OnInit {
  user$ = this.auth.user$;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
