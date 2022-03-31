import { Injectable } from '@angular/core';
//HeroService 可以從任何地方獲取資料：Web 服務、本地儲存（LocalStorage）或一個模擬的資料來源。
import { Hero } from './data/hero';
import { HEROES } from './data/mock-heroes';
//Observable 是 RxJS 函式庫中的一個關鍵類別。
//使用 RxJS 的 of() 函式來模擬從伺服器返回資料。
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
//實現模擬的英雄列表
  getHeroes(): Observable<Hero[]> {
    //of(HEROES) 會返回一個 Observable<Hero[]>，它會發出單個值，這個值就是這些模擬英雄的陣列。
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  //修改這個建構函式，新增一個私有的 messageService 屬性引數。 Angular 將會在建立 HeroService 時把 MessageService 的單例注入到這個屬性中。
  constructor(private messageService: MessageService) { }
  //這是一個典型的“服務中的服務”場景： 把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero)
  } 
}