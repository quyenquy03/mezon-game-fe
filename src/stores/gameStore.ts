/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/counterStore.ts
import { CurrentRoundInfo, IEndGameDTO, ITurnResult } from "@/interface/game/Game";
import { create } from "zustand";

interface GameState {
  currentGame: any;
  currentChoice: Choice | null;
  currentRoundInfo: CurrentRoundInfo | null;
  currentRound: number;
  currentTurn: number;
  roundResult: string[];
  gameResult: IEndGameDTO | null;
  isShowGameResult: boolean;
  currentTurnResult: ITurnResult | null;

  // Function
  setCurrentGame: (game: any) => void;
  setCurrentChoice: (choice: Choice | null) => void;
  setCurrentRoundInfo: (roundInfo: CurrentRoundInfo | null) => void;
  setCurrentRound: (round: number) => void;
  setCurrentTurn: (turn: number) => void;
  setGameResult: (result: IEndGameDTO | null) => void;
  setRoundResult: (result: string[]) => void;
  setIsShowGameResult: (isShow: boolean) => void;
  setCurrentTurnResult: (result: ITurnResult | null) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  currentChoice: null,
  currentRoundInfo: null,
  currentRound: 1,
  currentTurn: 1,
  gameResult: null,
  isShowGameResult: false,
  roundResult: [],
  setRoundResult: (result) => set({ roundResult: result }),
  currentTurnResult: null,

  // Function
  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentChoice: (choice) => set({ currentChoice: choice }),
  setCurrentRoundInfo: (roundInfo) => set({ currentRoundInfo: roundInfo }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentTurn: (turn) => set({ currentTurn: turn }),
  setGameResult: (result) => set({ gameResult: result }),
  setIsShowGameResult: (isShow: boolean) => set({ isShowGameResult: isShow }),
  setCurrentTurnResult: (result) => set({ currentTurnResult: result }),
}));

export default useGameStore;
