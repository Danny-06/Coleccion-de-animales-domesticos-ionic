import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  async fetch(path: string, responseType: any = 'blob'): Promise<string | Blob | ArrayBuffer | object | []> {
    return this.http.get(path, {responseType}).toPromise()
  }
}
