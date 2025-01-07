/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/counterStore.ts
import { CurrentRoundInfo, IEndGameDTO } from "@/interface/game/Game";
import { create } from "zustand";

interface GameState {
  currentGame: any;
  currentChoice: Choice | null;
  currentRoundInfo: CurrentRoundInfo | null;
  currentRound: number;
  currentTurn: number;
  gameResult: IEndGameDTO | null;
  isShowGameResult: boolean;

  // Function
  setCurrentGame: (game: any) => void;
  setCurrentChoice: (choice: Choice | null) => void;
  setCurrentRoundInfo: (roundInfo: CurrentRoundInfo | null) => void;
  setCurrentRound: (round: number) => void;
  setCurrentTurn: (turn: number) => void;
  setGameResult: (result: IEndGameDTO | null) => void;
  setIsShowGameResult: (isShow: boolean) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  currentChoice: null,
  currentRoundInfo: null,
  currentRound: 1,
  currentTurn: 1,
  gameResult: null,
  isShowGameResult: false,

  // Function
  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentChoice: (choice) => set({ currentChoice: choice }),
  setCurrentRoundInfo: (roundInfo) => set({ currentRoundInfo: roundInfo }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentTurn: (turn) => set({ currentTurn: turn }),
  setGameResult: (result) => set({ gameResult: result }),
  setIsShowGameResult: (isShow: boolean) => set({ isShowGameResult: isShow }),
}));

export default useGameStore;
