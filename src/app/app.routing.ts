import { Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';

export const appRoutes: Routes = [
    { path: 'home', component: PlacesComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];
