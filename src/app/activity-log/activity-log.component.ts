import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  logCollection =[
    { id: 1, name: 'dave summers', userName: 'dave', location: 'HeadQuarters', radius: 1000, types: ['cafe', 'school'] },
    { id: 2, name: 'dave summers', userName: 'dave', location: 'HeadQuarters', radius: 1000, types: ['cafe', 'school'] },
    {id:3,name:'clair summers',userName:'clair',location:'Negombo',radius:1000,types:['cafe','spa']},
  ];
  model=[
    { id: null, 
      name: '',
      userName: '', 
      location: '', 
      radius: null, 
      types: [] 
    }

  ]
  constructor(private activityService:ActivityService) { }
  filter(query){
    console.log(JSON.stringify(this.model));
    
  }
  get islogDataAvailable(){
    return this.logCollection.length!==0?true:false;
  }
  ngOnInit() {
    this.activityService
  }

}
