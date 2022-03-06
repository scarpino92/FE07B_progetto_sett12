import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { MoviesPage } from './pages/movies.page';
import { ProfilePage } from './pages/profile.page';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { HomePage } from './pages/home.page';
import { MovieInfoPage } from './pages/movie-info.page';

const routes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    component: MoviesPage,
    children: [
      {
        path: ':id',
        component: MovieInfoPage,
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesPage,
    ProfilePage,
    HomePage,
    MovieInfoPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AuthRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
