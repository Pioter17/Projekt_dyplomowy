import { MastermindComponent } from "@pages/game-page/components/mastermind/mastermind.component";
import { MemoryComponent } from "@pages/game-page/components/memory/memory.component";
import { MinesweeperComponent } from "@pages/game-page/components/minesweeper/minesweeper.component";
import { WhackAMoleComponent } from "@pages/game-page/components/whack-a-mole/whack-a-mole.component";
import { Game } from "@core/config/game.interface";
import { MINESWEEPER_MOCK } from "@pages/game-page/mock/minesweeper-scores.mock";
import { MEMORY_MOCK } from "@pages/game-page/mock/memory-scores.mock";
import { WHACKAMOLE_MOCK } from "@pages/game-page/mock/whack-a-mole.mock";
import { MASTERMIND_MOCK } from "@pages/game-page/mock/mastermind-scores.mock";
import { MinesweeperTipsComponent } from "@pages/game-page/components/tips/minesweeper-tips/minesweeper-tips.component";
import { MemoryTipsComponent } from "@pages/game-page/components/tips/memory-tips/memory-tips.component";
import { MastermindTipsComponent } from "@pages/game-page/components/tips/mastermind-tips/mastermind-tips.component";
import { WhackamoleTipsComponent } from "@pages/game-page/components/tips/whackamole-tips/whackamole-tips.component";

export const Games: Record<string, Game> = {
  'minesweeper': {
    game: MinesweeperComponent,
    tips: MinesweeperTipsComponent,
    scores: MINESWEEPER_MOCK,
  },
  'memory': {
    game: MemoryComponent,
    tips: MemoryTipsComponent,
    scores: MEMORY_MOCK,
  },
  'whack-a-mole': {
    game: WhackAMoleComponent,
    tips: WhackamoleTipsComponent,
    scores: WHACKAMOLE_MOCK,
  },
  'mastermind': {
    game: MastermindComponent,
    tips: MastermindTipsComponent,
    scores: MASTERMIND_MOCK
  },
}
