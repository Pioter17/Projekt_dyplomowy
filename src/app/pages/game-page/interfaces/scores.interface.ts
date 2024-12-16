export interface Score {
  username: string;
  score: number;
}

export interface ScoreDTO {
  game: string;
  score: number;
}

export interface DisplayedScore {
  username: string;
  score: string;
}
