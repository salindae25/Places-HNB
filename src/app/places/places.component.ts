import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewPlace, Place, Radius, Type, CSVPlace } from './places.model';
import { PlacesService } from './places.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
  providers: [PlacesService]
})
export class PlacesComponent implements OnInit {
  queryData: any;
  down: any;
  apiKey = 'AIzaSyDgiFkqYXkSGmgFRV6F0ApZpGVikwGZhgw';
  viewData: Array<ViewPlace>;
  placeDetailUrl = 'api/place/details/json?placeid=';
  places: Place[] = [
    { Name: 'HNB (Head Office)', Latititude: 6.921098, Longititude: 79.862532 },
    { Name: 'HNB (Negombo)', Latititude: 7.208752, Longititude: 79.839170 },
    { Name: 'HNB (Galle)', Latititude: 6.033299, Longititude: 80.216711 },
    { Name: 'HNB (Kandy)', Latititude: 7.292896, Longititude: 80.637392 },

  ];
  radius: Radius[] = [
    { InMeters: 1000, InKiloMeters: 1 },
    { InMeters: 5000, InKiloMeters: 5 },
    { InMeters: 10000, InKiloMeters: 10 },
    { InMeters: 20000, InKiloMeters: 20 },
  ];
  types: Type[] = [
    { DataAvaialble: false, Checked: false, Name: 'Restaurant', ParameterName: 'resturant' },
    { DataAvaialble: false, Checked: false, Name: 'Cafe', ParameterName: 'cafe' },
    { DataAvaialble: false, Checked: false, Name: 'Hotel', ParameterName: 'hotel' },
    { DataAvaialble: false, Checked: false, Name: 'Courthouse', ParameterName: 'courthouse' },
    { DataAvaialble: false, Checked: false, Name: 'Gym', ParameterName: 'gym' },
    { DataAvaialble: false, Checked: false, Name: 'ATM', ParameterName: 'atm' },
    { DataAvaialble: false, Checked: false, Name: 'Bank', ParameterName: 'bank' }
  ];
  dataAvailableFlag = false;
  dataLoadingFlag = false;
  noDataFlag = false;
  constructor(private placeService: PlacesService, private cdrf: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  onSubmit(place, radius: number) {
    // debugger;
    const selectedType = this.selectedTypes;
    this.viewData = [];
    this.dataAvailableFlag = false;
    this.dataLoadingFlag = true;
    const placeObj = this.findPlaceObjUsingName(place);
    if (selectedType) {
      selectedType.forEach((type) => {
        this.doQueryBasedOnType(placeObj, radius, type);
        this.cdrf.detectChanges();
      });
    }
  }
  setDataFlag() {
    this.types.filter((opt) => {
      if (opt.DataAvaialble) {
        this.dataAvailableFlag = true;
      }

    });

  }
  get selectedTypes() {
    return this.types
      .filter(opt => opt.Checked)
      .map(opt => opt.ParameterName);
  }

  checkDataAvailability() {
    if (this.dataAvailableFlag === false) {
      this.noDataFlag = true;
      setTimeout(() => {
        this.noDataFlag = false;
      }, 5000);
    }
  }

  setDataAvailableTrue(type: string) {
    this.types.forEach((opt) => {
      if (opt.ParameterName === type) {
        opt.DataAvaialble = true;
      }
    });
  }

  processData(data: any, type: string) {

    if (data.results !== [] || data.status === 'OK') {

      data.results.forEach((placeObj: any) => {
        const _viewObj: ViewPlace = this.setViewObject(placeObj, type);
        const typesTemp: string = placeObj.types;
        // if there are no photos obj is excluded
        // type of query not match
        if (typesTemp.indexOf(type) >= 0 && placeObj.photos) {
          this.viewData.push(_viewObj);
        }
        if (this.viewData.length > 0) {
          this.setDataAvailableTrue(type);
        }
      });
      this.setDataFlag();
      this.dataLoadingFlag = false;
      this.createDataURlToDownload();
      this.cdrf.detectChanges();

    }
  }
  setViewObject(placeObj, type) {
    const _viewObj: ViewPlace = new ViewPlace();
    let photos;
    _viewObj.Name = placeObj.name;
    _viewObj.Rating = placeObj.rating;
    _viewObj.Address = placeObj.vicinity;
    _viewObj.Address = _viewObj.Address.toLowerCase();
    _viewObj.Type = type;
    if (placeObj.photos) {
      photos = placeObj.photos['0'];
      _viewObj.ImgUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + photos.width;
      _viewObj.ImgUrl += '&photoreference=' + photos.photo_reference + '&key=' + this.apiKey;
    }
    _viewObj.DetailUrl = this.placeDetailUrl + placeObj.place_id + '&key=' + this.apiKey;
    return _viewObj;
  }

  doQueryBasedOnType(place: Place, radius: number, type: string) {
    // debugger;
    let _queryData = null;
    const localKey = place.Name + '_' + radius + '_' + type;
    if (localStorage.getItem(localKey)) {
      _queryData = JSON.parse(localStorage.getItem(localKey));
      this.queryData = _queryData;
      this.processData(_queryData, type);
      this.checkDataAvailability();

    } else {
      _queryData = this.callService(place, radius, type);
    }
  }

  callService(place: Place, radius: number, type: string) {

    this.placeService.doQuery(place, radius, type)
      .subscribe(
        (data: any) => {
          this.saveAtLocalStorage(data, place, radius, type);
          this.processData(data, type);
          this.checkDataAvailability();
          return data;
        }
      );
  }
  saveAtLocalStorage(data, place, radius, type) {
    data._place = place;
    data.radius = radius;
    data.type = type;
    localStorage.setItem(place.Name + '_' + radius + '_' + type, JSON.stringify(data));
  }
  findPlaceObjUsingName(name: string): Place {
    // ToDo:set an default value if needed
    let _palce: Place;
    this.places.forEach((place: Place) => {
      if (place.Name === name) {
        _palce = place;
      }
    });
    return _palce;
  }

  processCSVData(data) {
    const csvDataArray = [];
    if (data.length !== 0) {
      data.forEach((element: ViewPlace) => {
        const csvPlaceObj: CSVPlace = {
          Name: element.Name,
          Type: element.Type,
          Rating: element.Rating,
          Address: element.Address,
          DetailUrl: element.DetailUrl
        };
        csvDataArray.push(csvPlaceObj);
      });
      return csvDataArray;
    }
  }

  createDataURlToDownload() {
    if (this.viewData.length !== 0) {

      const csvData = this.processCSVData(this.viewData);
      const testblob = this.arrayToCSV(csvData);
      const blob = new Blob([testblob], { type: 'text/csv' });
      this.down = window.URL.createObjectURL(blob);
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  arrayToCSV(objArray) {
    if (objArray.length !== 0) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      const str = `${Object.keys(array[0]).map(value => `"${value}"`).join(',')}` + '\r\n';
      return array.reduce((st, next) => {
        st += `${Object.values(next).map(value => `"${value}"`).join(',')}` + '\r\n';
        return st;
      }, str);
    }
  }
}


