import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //修改建構函式，新增一個 public 的 messageService 屬性。 Angular 將會在建立 MessagesComponent 的實例時 把 MessageService 的實例注入到這個屬性中。
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}