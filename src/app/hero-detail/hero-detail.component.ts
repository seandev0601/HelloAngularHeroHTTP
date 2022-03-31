import { Component, OnInit,Input } from '@angular/core';//匯入input
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

//接收hero物件，並顯示
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  
  //ActivatedRoute 儲存著到這個 HeroDetailComponent 實例的路由資訊。 這個元件對從 URL 中提取的路由引數感興趣。 其中的 id 引數就是要顯示的英雄的 id。
  //HeroService 從遠端伺服器獲取英雄資料，本元件將使用它來獲取要顯示的英雄。
  //location 是一個 Angular 的服務，用來與瀏覽器打交道。 稍後，你就會使用它來導航回上一個檢視。
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    //route.snapshot 是一個路由資訊的靜態快照，抓取自元件剛剛建立完畢之後。
    //paramMap 是一個從 URL 中提取的路由引數值的字典。 "id" 對應的值就是要獲取的英雄的 id。
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}