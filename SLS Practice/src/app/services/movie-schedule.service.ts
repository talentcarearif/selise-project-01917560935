import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieScheduleService {

  constructor(private http: HttpClient) { }

  public getMovieList(): Observable<any> {
    return this.http.get(`https://gist.githubusercontent.com/robynitp/10153952/raw/58903d7995bd84ed3a65c4ed5847836311c7131f/weather_example.json`);
  }

  public saveMovie(data:any) {
    return this.http.post(`/api/contract-emp-extend/add`, data);
  }
}
