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
    { Name: 'lodging', DefaultImage: '' },
    { Name: 'gym', DefaultImage: 'https://gymsoftheworldblog.files.wordpress.com/2016/08/062a0-img_3735.jpg' },
    { Name: 'courthouse', DefaultImage: 'http://www.sundaytimes.lk/141109/uploads/Aluthkade2.jpg' },
    { Name: 'atm', DefaultImage: 'https://thumbs.dreamstime.com/b/atm-design-graphic-vector-illustration-46186301.jpg' },
    { Name: 'bank', DefaultImage: 'http://www.psdgraphics.com/wp-content/uploads/2011/03/bank-icon.jpg' },
  ];
  dataUrl: string;
  constructor(private imageService: ImageService) { }

  ngOnChanges() {
    if (this.url) {
      this.imageService.get(this.url).subscribe(resp => {
        this.dataUrl = resp[0];
      }, err => {
        if (err.statusText === 'OK' && err.status === 200) {
          this.dataUrl = err.url ? err.url : null;
        } else {
          this.types.forEach((element) => {
            if (element.Name === this.type) {
              this.dataUrl = element.DefaultImage;
            }
          });
        }
      });
    }
  }
  changeHappen() {
    if (this.url) {
      this.imageService.get(this.url).subscribe(resp => {
        console.log(resp);
      });
    }
  }
  convertToDataUrl() {

  }
}
