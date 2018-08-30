import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ViewPlace, Place, Radius, Type, CSVPlace } from './places.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PlacesService } from './places.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
  providers: [PlacesService]
})
export class PlacesComponent implements OnInit {
  queryData: any;
  down: any;
  apiKey = '';
  viewData: Array<ViewPlace> = [];
  placeDetailUrl = 'api/place/details/json?placeid=';
  downloadableFileName: string;
  selectedPlaceCntrl: FormControl = new FormControl();
  // **********************AutoComplete Types variables***********************************//
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedTypeCtrl: FormControl = new FormControl();
  _selectedTypes: string[] = [];
  filteredTypes: Observable<string[]>;

  allTypes: string[] = ['Cafe', 'School', 'Lodging', 'Hospital', 'Gym', 'Spa', 'Restaurant'];
  types: Place[] = [];

  @ViewChild('typeInput') typeInput: ElementRef;
  // **********************************************************************************//
  places: Place[] = [
    { Name: 'Head Office', Latititude: 6.921098, Longititude: 79.862532 },
    { Name: 'Negombo', Latititude: 7.208752, Longititude: 79.839170 },
    { Name: 'Galle', Latititude: 6.033299, Longititude: 80.216711 },
    { Name: 'Kandy', Latititude: 7.292896, Longititude: 80.637392 },

  ];
  radius: Radius[] = [
    { InMeters: 1000, InKiloMeters: 1 },
    { InMeters: 5000, InKiloMeters: 5 },
    { InMeters: 10000, InKiloMeters: 10 },
    { InMeters: 20000, InKiloMeters: 20 },
  ];
  dataAvailableFlag = false;
  dataLoadingFlag = false;
  noDataFlag = false;
  locationsOptions: Observable<Place[]>;
  constructor(
    private placeService: PlacesService,
    private cdrf: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {


    this.locationsOptions = this.selectedPlaceCntrl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => name ? this._filter(name) : this.places.slice())
      );

    this.filteredTypes = this.selectedTypeCtrl.valueChanges
      .pipe(
        startWith<string>(''),
        map((type) => type ? this._filterType(type) : this.allTypes.slice())
      );
      if(localStorage.getItem('apiKey'))
      {
        this.apiKey=localStorage.getItem('apiKey');
      }
  }
  ngOnInit() {
  }
  // **********************AutoComplete Types functions***********************************//
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add type
    if ((value || '').trim()) {
      const typeToPush = this._matchType(value.trim());
      this._selectedTypes.push(typeToPush);
      // this._selectedTypes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.selectedTypeCtrl.setValue(null);
  }

  remove(type: string): void {
    const index = this._selectedTypes.indexOf(type);

    if (index >= 0) {
      this._selectedTypes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._selectedTypes.push(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
    this.selectedTypeCtrl.setValue(null);
  }
  private _matchType(str) {
    const re = new RegExp(str.toLowerCase() + '[a-z]*', 'g');
    let returnValue = '';
    this.allTypes.forEach((element) => {
      const checkingStr = element.toLowerCase().match(re);
      if (checkingStr) {
        if (checkingStr[0] === element.toLowerCase()) {
          returnValue = element;
        }
      }
    });
    return returnValue;
  }
  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().indexOf(filterValue) === 0);
  }
  // ***************************************************** //

  openDialog(url): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(PlaceDetailComponent, {
      height: 'auto',
      width: '650px',
      panelClass: 'detail-modal',
      data: { url: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  convertMeters(rad) {
    return rad * 1000;
  }

  onSubmit(place, radius: number) {
    // const selectedType = this.selectedTypes;
    this.viewData = [];
    radius = this.convertMeters(radius);
    this.dataAvailableFlag = false;
    this.dataLoadingFlag = true;
    this.noDataFlag = false;
    const placeObj = this.findPlaceObjUsingName(place);
    if (this._selectedTypes !== []) {
      this._selectedTypes.forEach((type) => {
        this.doQueryBasedOnType(placeObj, radius, type.toString().toLowerCase());
        this.cdrf.detectChanges();
      });
    }
  }
  displayFn(user?: string): string | undefined {
    return user ? user : undefined;
  }
  private _filter(name: string): Place[] {
    const filterValue = name.toLowerCase();

    return this.places.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }
  

  checkDataAvailability() {
    if (this.isDataAvailable === false) {
      this.noDataFlag = true;
    }
  }

  isValid(place, radius) {
    if (place !== '' && radius !== '' && this._selectedTypes.length !== 0) {
      return false;
    }
    return true;
  }


  processData(data: any, type: string) {

    if (data.results !== [] || data.status === 'OK') {

      data.results.forEach((placeObj: any) => {
        const _viewObj: ViewPlace = this.setViewObject(placeObj, type);
        const typesTemp: string = placeObj.types;
        // type of query not match
        if (typesTemp.indexOf(type.toLowerCase()) >= 0) {
          this.viewData.push(_viewObj);
        }
        if (this.viewData.length > 0) {
          // this.setDataAvailableTrue(type);
        }
      });
      // this.setDataFlag();
      this.dataLoadingFlag = false;
      this.createDataURlToDownload();
      let temp = JSON.parse(JSON.stringify(this.viewData));
      this.viewData =temp;
      this.cdrf.detectChanges();

    }
  }

  stringCapitalize(str: string) {
    if (str) {
      let res = str.replace(/\s[a-z]+/gi, function (x) {
        return x[0] + x[1].toUpperCase() + x.substring(2);
      });
      res = str.replace(/[a-z]+\s/gi, function (x) {
        return x[0].toUpperCase() + x.substring(1);
      });
      return res;
    }
  }

  setViewObject(placeObj, type) {
    const _viewObj: ViewPlace = new ViewPlace();
    let photos;
    _viewObj.Name = this.stringCapitalize(placeObj.name);
    if (placeObj.rating) {
      _viewObj.Rating = 0.0;
    }
    _viewObj.Rating = placeObj.rating;
    _viewObj.Address = placeObj.vicinity;
    _viewObj.Type = type;
    if (placeObj.photos) {
      photos = placeObj.photos['0'];
      _viewObj.ImgUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + photos.width;
      _viewObj.ImgUrl += '&photoreference=' + photos.photo_reference + '&key=' + this.apiKey;
    } else {
      _viewObj.ImgUrl = null;
    }
    _viewObj.DetailUrl = this.placeDetailUrl + placeObj.place_id + '&key=' + this.apiKey;
    return _viewObj;
  }

  doQueryBasedOnType(place: Place, radius: number, type: string) {
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

  get isDataAvailable() {
    if (this.viewData) {
      if (this.viewData.length !== 0) {
        return true;
      }
    }
    return false;
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
          DetailUrl: 'https://maps.googleapis.com/maps/' + element.DetailUrl
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
      this.downloadableFileName = this.createDownloadableFileName();
      this.down = window.URL.createObjectURL(blob);
    }
  }

  createDownloadableFileName() {
    let name = 'places';
    const timeStamp = this.getTimeStamp();
    name = name + '-' + timeStamp + '.csv';
    return name;
  }

  getTimeStamp() {
    const d = new Date();
    const n = d.toISOString().toString();
    return n;
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
  dowloadExcel(key:string) {
    var dataSheets = [];
    var sheetHeaders = [];
    var fileName='Place';
    if(key.toLowerCase()==='all'){    
      this._selectedTypes.forEach((element) => {
        if (element) {
          var op = { sheeitd: element.toLowerCase(), header: false };
          var ds = this.viewData.filter((ele) => {
            return ele.Type == element.toLowerCase();
          });
          dataSheets.push(ds);
          sheetHeaders.push(op);
        }
      });
    }else{
      var op = { sheeitd: key, header: false };
      sheetHeaders.push();
      var ds = this.viewData.filter((ele) => {
        return ele.Type == key.toLowerCase();
      });
      dataSheets.push(ds);
    }
    fileName += '_' + key;
    //  const opts = [{ sheeitd: "Sheet 1", header: true }, { sheeitd: "Sheet 2", header: true }];
    alasql("SELECT INTO XLSX (?,?) FROM ?", [fileName,sheetHeaders, dataSheets]);
  }
}


