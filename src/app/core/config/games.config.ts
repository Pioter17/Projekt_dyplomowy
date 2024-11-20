import { MastermindComponent } from '@pages/game-page/components/mastermind/mastermind.component';
import { MemoryComponent } from '@pages/game-page/components/memory/memory.component';
import { MinesweeperComponent } from '@pages/game-page/components/minesweeper/minesweeper.component';
import { WhackAMoleComponent } from '@pages/game-page/components/whack-a-mole/whack-a-mole.component';
import { Game } from '@core/config/game.interface';
import { MinesweeperTipsComponent } from '@pages/game-page/components/tips/minesweeper-tips/minesweeper-tips.component';
import { MemoryTipsComponent } from '@pages/game-page/components/tips/memory-tips/memory-tips.component';
import { MastermindTipsComponent } from '@pages/game-page/components/tips/mastermind-tips/mastermind-tips.component';
import { WhackamoleTipsComponent } from '@pages/game-page/components/tips/whackamole-tips/whackamole-tips.component';
import { CombinationsComponent } from '@pages/game-page/components/combinations/combinations.component';
import { CombinationsTipsComponent } from '@pages/game-page/components/tips/combinations-tips/combinations-tips.component';
import { SolitaireComponent } from '@pages/game-page/components/solitaire/solitaire.component';
import { SolitaireTipsComponent } from '@pages/game-page/components/tips/solitaire-tips/solitaire-tips.component';

export const Games: Record<string, Game> = {
  minesweeper: {
    game: MinesweeperComponent,
    tips: MinesweeperTipsComponent,
  },
  memory: {
    game: MemoryComponent,
    tips: MemoryTipsComponent,
  },
  'whack-a-mole': {
    game: WhackAMoleComponent,
    tips: WhackamoleTipsComponent,
  },
  mastermind: {
    game: MastermindComponent,
    tips: MastermindTipsComponent,
  },
  combinations: {
    game: CombinationsComponent,
    tips: CombinationsTipsComponent,
  },
  solitaire: {
    game: SolitaireComponent,
    tips: SolitaireTipsComponent,
  },
};
