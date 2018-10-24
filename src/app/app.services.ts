import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Headers } from '@angular/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };


@Injectable()
export class DataService {

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        };
        return new Headers(headersConfig);
    }
 
    private formatErrors(error: any) {
        return Observable.throw({ status: error.status, data: error.json() });
    }

    private actionUrl: string;

    constructor(private http: HttpClient) {
        this.actionUrl = 'http://localhost:3000/contacts/';
    }

    public getAll(): Observable<any> {
        return this.http.get(this.actionUrl);
    }

    public getSingle(id: number): Observable<any> {
        return this.http.get(this.actionUrl + id);
    }

    public add(item: Object={} ): Observable<any> {
        const toAdd = JSON.stringify(item);
        return this.http.post(this.actionUrl, toAdd, httpOptions);
    }

    public update(id: string, itemToUpdate: any): Observable<any> {
        return this.http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), httpOptions);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(this.actionUrl + id, httpOptions);
    }
}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}