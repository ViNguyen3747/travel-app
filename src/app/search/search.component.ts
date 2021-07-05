import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISearch } from '../shared/interface';
import { LatLonService } from '../shared/lat-lon.service';
import { ILocation } from '../shared/interface';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {  
  @Output() searchEvent = new EventEmitter<ISearch>();
  locationFormGroup: FormGroup;
  location: ILocation;
  search: ISearch = {
    city: 'London, GB',
    lat: 51.5085,
    lon: -0.1257,
    categories: 'SIGHTS'
  };
  constructor(private _formBuilder: FormBuilder, private mapService: LatLonService) { }

  ngOnInit(): void {
    this.locationFormGroup = this._formBuilder.group({
      city: ['London, GB'],
      categories: ['SIGHTS']    
    });
  }

  findLatLon() {
    this.search.categories = this.locationFormGroup.value.categories;
    this.mapService.getLocation(this.locationFormGroup.value.city).subscribe({
      next: data => {
        this.location = data[0];
        this.search.city = this.location.name;
        this.search.lat = this.location.lat;
        this.search.lon = this.location.lon
        console.log(this.search);        
        this.searchEvent.emit(this.search);
      },
      error: err => console.log(err)
    });
  }
}
