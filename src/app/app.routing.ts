import { Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { PlaceAuthGuard } from './place-auth.guard';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ActivityAuthGuard } from './activity-auth.guard';

export const appRoutes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'places', component: PlacesComponent, canActivate: [PlaceAuthGuard] },
    { path: 'activityLog', component: ActivityLogComponent,canActivate:[ActivityAuthGuard] },
    { path: '**', component: ErrorComponent }
];
