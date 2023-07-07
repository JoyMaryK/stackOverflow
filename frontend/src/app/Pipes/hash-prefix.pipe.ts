import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashPrefix',
  standalone: true
})
export class HashPrefixPipe implements PipeTransform {


  transform(value: string): string {
    return '#'+value
     
  }

}
