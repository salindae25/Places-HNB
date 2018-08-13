import { Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';
import { FrontPageComponent } from './front-page/front-page.component';

export const appRoutes: Routes = [
    { path: 'home', component: FrontPageComponent },
    { path: 'places', component: PlacesComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];
