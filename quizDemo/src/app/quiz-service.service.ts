import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class QuizService {

   constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get('http://localhost:3000'+url);
  }

  getAll() {
    return [
      { url: '/aspnet', name: 'Asp.Net' },
      { url: '/csharp', name: 'C Sharp' }
    ];
  }

}
