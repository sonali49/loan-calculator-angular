import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    console.log("MESSAGEEEEE", message)
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
