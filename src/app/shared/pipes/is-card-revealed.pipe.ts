import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '@pages/game-page/components/solitaire/card';

@Pipe({
  name: 'IsCardRevealedPipe',
  standalone: true,
})
export class IsCardRevealedPipe implements PipeTransform {
  transform(card: Card): boolean {
    return card.getCardData().isRevealed;
  }
}
