import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap, map } from 'rxjs/operators';
import { IToken, IPlace } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private amadeusAPI = 'https://test.api.amadeus.com/v1/reference-data/locations/pois?';
  private tokenURL = "https://test.api.amadeus.com/v1/security/oauth2/token";
  constructor(private http: HttpClient) { }

  getToken(): Observable<string>{
    let body = "grant_type=client_credentials&client_id=XqUdTwscLEweArGesKWvKO875oTKaz5c&client_secret=SiWZQo1LeOA7vKFT";
    let headers = new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
    return this.http.post<IToken>(this.tokenURL,body, {
      headers: headers
    }).pipe(
      map(data => data.access_token),
      tap(data =>console.log(data)),
      catchError(this.handleError)
  );
  }

  getPlaces(token: string, lat: number, lon:number, categorie: string): Observable<IPlace[]>{
    let params = new HttpParams()
      .set('latitude', lat)
      .set('longitude', lon)
      .set('radius',20)
      .set('categories',categorie);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  return this.http.get<any>(this.amadeusAPI,{headers: headers, params: params}).pipe(
    map(result => result.data),
    tap(data =>console.log(data)),
    catchError(this.handleError)
  );
}
private handleError(err: HttpErrorResponse) {
  console.error(err);
  return throwError(err);
}
}
