import { Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';
import { FrontPageComponent } from './front-page/front-page.component';

export const appRoutes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'places', component: PlacesComponent },
    { path: '**', component: ErrorComponent }
];
