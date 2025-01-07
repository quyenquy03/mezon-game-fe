import { User } from "../user/User";

export interface CurrentRoundInfo {
  gameId: string;
  roundId: string;
  currentRound: number;
  currentTurn: number;
  yourInfo: User;
  rivalInfo: User;
}

export interface StartTurnSubmit {
  roomId: string;
  gameId: string;
  userId: string;
  currentRound: number;
  roundId: string;
  currentTurn: number;
}

export interface SubmitTurnData extends StartTurnSubmit {
  choice?: string;
}

export interface EndRoundData {
  roomId: string;
  gameId: string;
  roundId: string;
  currentRound: number;
  isWinner: boolean;
  winner: string;
}

export interface ContinueJoinGameSubmitData {
  roomId: string;
  gameId: string;
  userId: string;
  currentRound: number;
}

export interface ICombineNextRoundSubmitData {
  roomId: string;
  gameId: string;
  userId: string;
  currentRound: number;
  roundId: string;
}

export interface IEndGameDTO {
  roomId: string;
  gameId: string;
  winner: string;
  totalBet?: number;
  betOfOneGame?: number;
}
