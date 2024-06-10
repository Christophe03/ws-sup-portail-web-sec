import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChatPersonSearchPipe' })
export class ChatPersonSearchPipe implements PipeTransform {
  transform(value, args?) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((message) => {
        if (message.author) {
          return message.author.search(searchText) !== -1;
        }
        return false;
      });
    }
  }
}
