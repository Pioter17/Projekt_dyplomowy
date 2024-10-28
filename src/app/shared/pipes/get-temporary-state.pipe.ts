import { Pipe, type PipeTransform } from '@angular/core';
import { Card } from '@pages/game-page/components/solitaire/card';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'GetTemporaryState',
  standalone: true,
  pure: false,
})
export class GetTemporaryStatePipe implements PipeTransform {
  transform(card: Card): Observable<string> {
    return card.getTemporaryState().pipe(map((state) => state));
  }
}
