import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '@pages/game-page/components/solitaire/card';

@Pipe({
  name: 'GetLastFieldClass',
  standalone: true,
})
export class GetLastFieldClassPipe implements PipeTransform {
  transform(card: Card): string {
    if (card.CardData.value == -1) {
      if (card.isOnTop()) {
        return 'empty';
      } else {
        return 'covered';
      }
    }
    return '';
  }
}
