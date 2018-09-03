import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  emitChange$: Subject<any> = new BehaviorSubject<any>(null);
  constructor() { }
  emitPlace(value: any) {
    this.emitChange$.next(value);
  }
  get emitChange(): BehaviorSubject<any> {
    return (this.emitChange$ as BehaviorSubject<any>);
  }
  emitRole(value: any) {
    this.emitChange$.next(value);
  }
}
