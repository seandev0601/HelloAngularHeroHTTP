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

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    //catchError() 運算子會攔截失敗的 Observable。 它把錯誤物件傳給錯誤處理器，錯誤處理器會處理這個錯誤。
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes',[])));
  }

  //修改這個建構函式，新增一個私有的 messageService 屬性引數。 Angular 將會在建立 HeroService 時把 MessageService 的單例注入到這個屬性中。
  constructor(private http: HttpClient, private messageService: MessageService) { }
  //這是一個典型的“服務中的服務”場景： 把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero)
  } 

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
}