import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ngx-rating';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { ErrorComponent } from './error/error.component';
import { appRoutes } from './app.routing';
import { PlacesService } from './places/places.service';
import { ImageComponent } from './image/image.component';
import { ImageService } from './image/image.service';


@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    ErrorComponent,
    ImageComponent
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
    MatSelectModule
  ],
  providers: [
    PlacesService,
    ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
