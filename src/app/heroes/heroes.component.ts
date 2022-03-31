import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  //1. 聲明瞭一個私有 heroService 屬性，2. 把它標記為一個 HeroService 的注入點。
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  //呼叫 getHeroes() 取得資料
  ngOnInit() {
    this.getHeroes();
  }

  //從服務中獲取這些英雄資料
  getHeroes(): void {
    //等待 Observable 發出這個英雄陣列，這可能立即發生，也可能會在幾分鐘之後。 然後，subscribe() 方法把這個英雄陣列傳給這個回呼(Callback)函式，該函式把英雄陣列賦值給元件的 heroes 屬性。
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.heroes = this.heroService.getHeroes();
  }
}