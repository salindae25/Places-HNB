import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlacesService } from '../places.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Time } from '@angular/common';
import { DialogData, Photo } from '../places.model';


export interface DataSent {
  url: string;
}
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers: [PlacesService]
})
export class PlaceDetailComponent {
  errorFlag = false;

  viewData: DialogData;
  apiKey = 'AIzaSyCTY07DLNb078JDTetb41jgDnLZxOQtbgg';

  constructor(
    private placesService: PlacesService,
    public dialogRef: MatDialogRef<PlaceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataSent
  ) { }

  ngOnInit() {
    this.placesService.getDetails(this.data.url).subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.viewData = this.processData(data.result);
      }
    },
      error => {
        this.errorFlag = true;
        this.noDataFound();
      });
  }
  photoUrl(ref, width) {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + width + '&photoreference=' + ref + '&key=' + this.apiKey;
  }
  processData(data) {
    const dialogData: DialogData = new DialogData();
    dialogData.Name = data.name;
    dialogData.Address = data.formatted_address;
    dialogData.TelephoneNo = data.international_phone_number;
    dialogData.Type = data.types;
    if (data.photos) {
      dialogData.PhotoRef = data.photos.map((element) => {
        const photo: Photo = new Photo();
        photo.height = element.height;
        photo.width = element.width;
        photo.RefId = element.photo_reference;
        return photo;
      });
    } else {
      dialogData.PhotoRef = null;
    }
    if (data.website) {
      dialogData.WebSite = data.website;
    }
    if (data.rating) {
      dialogData.Rating = data.rating;
    } else {
      dialogData.Rating = 0.0;

    }
    if (data.opening_hours) {
      dialogData.WorkingHours = data.opening_hours.weekday_text;
      dialogData.openNow = data.opening_hours.open_now;
    } else {
      dialogData.WorkingHours = null;
      dialogData.openNow = null;
    }
    return dialogData;
  }
  noDataFound() { }
  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
