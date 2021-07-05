import { Component, OnInit } from '@angular/core';
import { icon, latLng, LayerGroup, Map, marker } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';

import { IPlace, ISearch } from '../shared/interface';
import { ContentComponent } from './content/content.component';
import { PlacesService } from '../shared/places.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchE: ISearch;
  private map: Map;
  private zoom: number;
  marker: any;
  popupcontent: any;
  markers: any;
  loading: boolean;

  constructor(private dialog: MatDialog, private placeService: PlacesService) { }

  ngOnInit() {
  }
  
  getIcon(category: string) {
    let url = '';
    if (category == 'SHOPPING') url = 'https://img.icons8.com/dusk/64/000000/shopping-cart-loaded--v1.png';
    else if (category == 'RESTAURANT') url = 'https://img.icons8.com/dusk/64/000000/restaurant.png';
    else url = 'https://img.icons8.com/clouds/100/000000/place-marker.png';
    return icon({
      iconSize: [ 40, 40 ],
      iconUrl: url,
      });
  }

  receiveMap(map: Map) {    
    this.map = map;
    this.markers = new LayerGroup().addTo(this.map);
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  searchEventHander($event: ISearch) {
    this.loading = true;
    this.searchE = $event;
    let token: string = '';
    if(this.markers) {
      this.markers.clearLayers();
    }
    this.map.flyTo([this.searchE.lat,this.searchE.lon], 12);
    this.placeService.getToken().subscribe({
      next: data => {
        token = data;
        this.getPlaces(token, this.searchE.lat, this.searchE.lon, this.searchE.categories);
      }
    })
  }

  getPlaces(token: string, lat: number, lon:number, categorie: string) {
    this.placeService.getPlaces(token,lat,lon,categorie).subscribe({
      next: data => this.addMarkers(data),
      error: err => {
        console.log(err);
        this.openDialog(this.initializePlace(), false)
      }
    })
  }

  addMarkers(places: IPlace[]) {
      this.loading = false;
      places.forEach((place) => {
        this.marker = marker(latLng(place.geoCode.latitude,place.geoCode.longitude),{icon: this.getIcon(place.category)}).addTo(this.markers)
                            .on('click', () => {
                            this.openDialog(place, true);
                            });
        //add Pop Up                      
        this.marker.on('mouseover', function(e) {
          e.target.bindPopup(
            `<div>${ place.name }</div>` +
            `<div>Click for more information</div>`
          ).openPopup();
          
        });
        this.marker.on('mouseout', function(e) {
          e.target.closePopup();
        });
      });    
  }

  openDialog(place: IPlace, success: boolean) {
    this.dialog.open(ContentComponent, {
      data: {
        success: success,
        place: place
      }
    });
  }

  initializePlace() {
    return {
      type: '',
      subType: '',
      id: '',
      self: {
          href: '',
          methods: ['']
      },
      geoCode: {
          latitude: 0,
          longitude: 0,
      },
      name: '',
      category: '',
      rank: 0,
      tags: ['']
    }
  }
    
}