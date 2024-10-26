import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '@pages/game-page/components/solitaire/card';

@Pipe({
  name: 'pwSolitaireCardValue',
  standalone: true,
})
export class SolitaireCardValuePipe implements PipeTransform {
  transform(card: Card): number {
    return card.CardData.value;
  }
}
