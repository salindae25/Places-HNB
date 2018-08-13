import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatSelectModule, MatDialogModule, MatGridListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ngx-rating';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';
import { appRoutes } from './app.routing';
import { PlacesService } from './places/places.service';
import { ImageComponent } from './image/image.component';
import { ImageService } from './image/image.service';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { DayPipe } from './day.pipe';
import { TimePeriodPipe } from './time-period.pipe';
import { TodayTimePeriodPipe } from './today-time-period.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    ErrorComponent,
    ImageComponent,
    PlaceDetailComponent,
    DayPipe,
    TimePeriodPipe,
    TodayTimePeriodPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule, MatDialogModule, MatExpansionModule, MatIconModule, MatGridListModule,
  ],
  providers: [
    PlacesService,
    ImageService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlaceDetailComponent]
})
export class AppModule { }
