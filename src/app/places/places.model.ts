export class Place {

    Name: string;
    Longititude: number;
    Latititude: number;
}

export class Type {
    Name: string;
    ParameterName: string;
    Checked: boolean;
    DataAvaialble: boolean;
}
export class ViewPlace {
    Name: string;
    ImgUrl: string;
    Rating: number;
    Address: string;
    Type: string;
    DetailUrl?: string;
}
export class Radius {
    InMeters: number;
    InKiloMeters: number;
}
export class CSVPlace {
    Name: string;
    Rating: number;
    Address: string;
    Type: string;
    DetailUrl?: string;
}
export class DialogData {
    Name: string;
    Type: string[];
    Address: string;
    TelephoneNo: string;
    PhotoRef?: Photo[];
    WorkingHours?: string[];
    openNow:boolean;
    WebSite:string;
}

export class Photo {
    RefId: string;
    width: number;
    height: number;
}
