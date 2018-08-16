import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [ImageService]
})
export class ImageComponent implements OnChanges {
  @Input() url: string;
  @Input() type: string;
  types = [
    { Name: 'restuarant', DefaultImage: '' },
    { Name: 'cafe', DefaultImage: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/97/7c/a6/photo1jpg.jpg' },
    { Name: 'lodging', DefaultImage: 'https://s-ec.bstatic.com/images/hotel/max1024x768/744/74480412.jpg' },
    { Name: 'school', DefaultImage: 'https://jumbodium.com/images/school-default.jpg' },
    { Name: 'hospital', DefaultImage: '/assets/hospital-default.jpg' },
    { Name: 'spa', DefaultImage: '/assets/spa-default.jpg' },
    { Name: 'gym', DefaultImage: 'https://gymsoftheworldblog.files.wordpress.com/2016/08/062a0-img_3735.jpg' },
  ];
  dataUrl: string;
  constructor(private imageService: ImageService) { }

  ngOnChanges() {
    if (this.url === null) {
      this.types.forEach((element) => {
        if (element.Name === this.type.toLowerCase()) {
          this.dataUrl = element.DefaultImage;
        }
      });
    } else {
      this.dataUrl = this.url;
    }
  }

  convertToDataUrl() {

  }
}
