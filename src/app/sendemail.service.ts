import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor(private http: HttpClient) { }


  sendToEmail(data) {

    let url = "http://localhost:3001/sendMail";
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    let body = JSON.stringify(data);


    return this.http.post(url, body, {
      headers: headers,
      withCredentials: true,
    }).map(res => res)
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error')
  }


}
