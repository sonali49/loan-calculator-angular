import { Component, OnInit } from '@angular/core';
import { MessageService } from '../config/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: '../messages/messages.compoent.html',
  styleUrls: ['../messages/messages.compoent.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  ngOnInit() { }
  clear() {
    return this.messageService.clear();
  }
}
