import { User } from "../user/User";

export interface RoomInfo {
  roomId: string;
  roomName: string;
  roomMaxUser: number;
  roomRound: number;
  roomBet: number;
  roomPassword: string;
  roomUsePassword: boolean;
}

export interface PlayerGroup {
  turn: number;
  player1Choice: string | null;
  player2Choice: string | null;
  winner: string | null;
}
export interface RoundGame {
  roundId: string;
  round: number;
  listPlayer: string[];
  currentTurn: number;
  playerGroup: PlayerGroup[];
}

export interface Room {
  roomId: string;
  roomInfo: RoomInfo;
  roomMembers: string[];
  roundGames: RoundGame[];
  totalBet: number;
  isPlaying: boolean;
  currentRound: number;
  currentRoundMember: User[];
}
