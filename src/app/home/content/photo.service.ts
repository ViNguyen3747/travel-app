import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap, map } from 'rxjs/operators';
import { IFlickers } from 'src/app/shared/interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private APIKey = "b54b6091022a76f3d55893d76b3fe54e";
  private flickrURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
  constructor(private http: HttpClient) { }

  getPhotos(name: string, lat: number, lon: number): Observable<IFlickers[]> {
    let params = new HttpParams()
      .set('api_key', this.APIKey)
      .set('text',name)
      .set('lat',lat)
      .set('lon',lon)
      .set('radius', '1')
      .set('radius_units', 'km')
      .set('format', 'json')
      .set('nojsoncallback','1');
    return this.http.get<any>(this.flickrURL, {params}).pipe(
      map(result => result.photos.photo),
      tap(data =>console.log(data)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }
}