import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashPrefix'
})
export class HashPrefixPipe implements PipeTransform {


  transform(value: string): string {
    return '#'+value
     
  }

}
