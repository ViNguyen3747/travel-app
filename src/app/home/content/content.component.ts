import { Component, OnInit, NgZone, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialog, IFlickers, IPlace } from 'src/app/shared/interface';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  place: IPlace;
  photoUrls: string[] = [""];
  constructor(public dialogRef: MatDialogRef<ContentComponent>, private ngZone: NgZone,
              private photoService: PhotoService,
             @Inject(MAT_DIALOG_DATA) public data: IDialog) {               
              ngZone.run(() => {
                this.place = data.place;                
                console.log(this.place);
                this.photoService.getPhotos(this.place.name, this.place.geoCode.latitude, this.place.geoCode.longitude).subscribe({
                  next: data => {
                    this.getPhotoUrl(data);
                  }
                });
              });
             };
  
  ngOnInit() {
  }

  getPhotoUrl(photos: IFlickers[]) {
    photos.forEach(photo => {
      this.photoUrls.push('https://live.staticflickr.com/' + photo.id + '/' + photo.id + '_' + photo.secret + '_w.jpg'); 
    })      
    console.log(this.photoUrls);
  }
  close() {
    this.ngZone.run(() => this.dialogRef.close());    
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}