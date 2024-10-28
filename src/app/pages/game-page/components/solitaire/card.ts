import { BehaviorSubject } from 'rxjs';

export class Card {
  private value: number; // 1 - As, 2 - 2, 3 - 3, ..., 10 - 10, 11 - J, 12 - Q, 13 - K, -1 - puste
  private isRevealed = false;
  private temporaryState = new BehaviorSubject<string>('');
  private color: number; // 1 - kier, 2 - trefl, 3 - karo, 4 - pik, -1 - puste
  private upperNeighbour: Card;
  private columnId: number;
  private id: number;

  constructor(
    value: number,
    color: number,
    upperNeighbour: Card,
    columnId: number,
    id: number,
    isRevealed: boolean = false
  ) {
    this.value = value;
    this.color = color;
    this.upperNeighbour = upperNeighbour;
    this.columnId = columnId;
    this.id = id;
    this.isRevealed = isRevealed;
  }

  getTemporaryState() {
    return this.temporaryState.asObservable();
  }

  get CardData() {
    return {
      columnId: this.columnId,
      id: this.id,
      color: this.color,
      value: this.value,
      isRevealed: this.isRevealed,
    };
  }

  setTemporaryState(state: string) {
    this.temporaryState.next(state);
    if (state == 'error') {
      setTimeout(() => {
        this.temporaryState.next('');
      }, 200);
    }
  }

  setTemporaryStateChain(state: string) {
    if (this.upperNeighbour) {
      this.upperNeighbour.setTemporaryStateChain(state);
    } 
    this.setTemporaryState(state);
  }

  setNeighbour(newNeighbour: Card) {
    this.upperNeighbour = newNeighbour;
  }

  canChainBeMoved(): boolean {
    if (!this.isRevealed) {
      return false;
    }
    if (this.isOnTop()) {
      return true;
    } else {
      if (this.upperNeighbour.canBePlacedAt(this) && this.upperNeighbour.CardData.color == this.color) {
        return this.upperNeighbour.canChainBeMoved();
      } else {
        return false;
      }
    }
  }

  canBePlacedAt(destinatioCard: Card): boolean {
    let dest = destinatioCard.CardData;
    if (dest.value == -1) {
      return true;
    }
    if ((dest.color - this.color) % 2 == 0 && dest.color != this.color) {
      return false;
    }
    if (this.value == 0) {
      return false;
    }
    if (dest.value - this.value == 1 || dest.value - this.value == -12) {
      return true;
    }
    return false;
  }

  isOnTop() {
    if (this.upperNeighbour == null) {
      return true;
    } else {
      return false;
    }
  }

  changeChainLocation(column: number, id: number) {
    this.columnId = column;
    this.id = id + 1;
    if (!this.upperNeighbour) {
      return;
    } else {
      this.upperNeighbour.changeChainLocation(column, id + 1);
    }
  }

  putOn(destinatioCard: Card) {
    destinatioCard.setNeighbour(this);
    this.changeChainLocation(destinatioCard.columnId, destinatioCard.id);
    this.setTemporaryState('');
  }

  reveal() {
    this.isRevealed = true;
    this.upperNeighbour = null;
  }
}
