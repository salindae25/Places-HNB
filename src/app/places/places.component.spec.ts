import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesComponent } from './places.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-rating';
import { PlacesService } from './places.service';
import { HttpClientModule } from '@angular/common/http';
import { Place } from './places.model';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;
  const tempPlace: Place = { Name: 'HNB (Negombo)', Latititude: 7.208752, Longititude: 79.839170 };
 const  apiKey = 'AIzaSyDgiFkqYXkSGmgFRV6F0ApZpGVikwGZhgw';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlacesComponent
      ],
      imports: [
        FormsModule,
        RatingModule,
        HttpClientModule],
      providers: [
        PlacesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should return place object', () => {

    expect(component.findPlaceObjUsingName('HNB (Negombo)')).toEqual(tempPlace);
  });


});
