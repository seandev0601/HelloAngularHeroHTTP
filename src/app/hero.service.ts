import { Injectable } from '@angular/core';
//HeroService 可以從任何地方獲取資料：Web 服務、本地儲存（LocalStorage）或一個模擬的資料來源。
import { Hero } from './data/hero';
import { HEROES } from './data/mock-heroes';
//Observable 是 RxJS 函式庫中的一個關鍵類別。
//使用 RxJS 的 of() 函式來模擬從伺服器返回資料。
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    //catchError() 運算子會攔截失敗的 Observable。 它把錯誤物件傳給錯誤處理器，錯誤處理器會處理這個錯誤。
    //使用 RxJS 的 tap() 運算子來實現，該運算子會檢視 Observable 中的值，使用那些值做一些事情，並且把它們傳出來。 這種 tap() 回呼(Callback)不會改變這些值本身。
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('getched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[])));
  }
  /** GET hero by id from the server */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  } 

  /** Insert message to MessageService */
  private log(message: string) {
    this.messageService.add(`HeroServicd: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
          .pipe(tap(_ => this.log(`update hero id=${hero.id}`)),
          catchError(this.handleError<any>(`updateHero`)));
  }
}