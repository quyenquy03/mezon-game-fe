import { useSocket } from "@/providers/SocketProvider";
import ChoiceOption from "./ChoiceOption";
import CountdownTime from "./CountdownTime";
import { useEffect, useState } from "react";
import { SocketEvents } from "@/constants/SocketEvents";
import { ContinueJoinGameSubmitData, EndRoundData, StartTurnSubmit, SubmitTurnData } from "@/interface/game/Game";
import { AppResponse } from "@/interface/app/AppResponse";
import useGameStore from "@/stores/gameStore";
import PlayerChoosed from "./PlayerChoosed";

const BodyGame = () => {
  const socket = useSocket();
  const currentChoice = useGameStore((state) => state.currentChoice);
  const currentTurn = useGameStore((state) => state.currentTurn);
  const setCurrentChoice = useGameStore((state) => state.setCurrentChoice);
  const setCurrentTurn = useGameStore((state) => state.setCurrentTurn);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!socket) return;
    socket.on(SocketEvents.ON.START_TURN_SUCCESS, (data: AppResponse<StartTurnSubmit>) => {
      setCurrentChoice(null);
      setCurrentTurn(data.data?.currentTurn as number);
      setTime(10);
    });
    socket.on(SocketEvents.ON.START_TURN_FAILED, (data: AppResponse<null>) => {
      setTime(0);
      console.log(data.errorMessage);
    });
    socket.on(SocketEvents.ON.SUBMIT_TURN_NOW, (data: AppResponse<StartTurnSubmit>) => {
      console.log("Submit turn now", data);
      const submitTurn: SubmitTurnData = {
        roomId: data.data?.roomId as string,
        userId: data.data?.userId as string,
        gameId: data.data?.gameId as string,
        roundId: data.data?.roundId as string,
        currentRound: data.data?.currentRound as number,
        currentTurn: data.data?.currentTurn as number,
        choice: currentChoice as string,
      };
      console.log("submit turn", submitTurn);
      socket.emit(SocketEvents.EMIT.SUBMIT_TURN, submitTurn);
      setTimeout(() => {
        console.log("Get turn result ==============");
        socket.emit(SocketEvents.EMIT.GET_TURN_RESULT, submitTurn);
      }, 1000);
    });
    socket.on(SocketEvents.ON.GET_TURN_RESULT_SUCCESS, (data: AppResponse<StartTurnSubmit>) => {
      console.log("Get turn result success", data);
      setTime(5);
    });
    socket.on(SocketEvents.ON.CONTINUE_TURN, (data: AppResponse<StartTurnSubmit>) => {
      console.log("Continue turn", data);
      socket.emit(SocketEvents.EMIT.START_TURN, data.data as StartTurnSubmit);
    });
    socket.on(SocketEvents.ON.END_OF_ROUND, (data: AppResponse<EndRoundData>) => {
      console.log("End of round", data);
      if (data.data?.isWinner) {
        console.log("continue join game");
        const continueJoinGameData: ContinueJoinGameSubmitData = {
          roomId: data.data.roomId,
          gameId: data.data.gameId,
          userId: data.data.winner,
          currentRound: data.data.currentRound + 1,
        };
        socket.emit(SocketEvents.EMIT.CONTINUE_JOIN_GAME, continueJoinGameData);
      }
      setTime(0);
    });

    return () => {
      socket.off(SocketEvents.ON.START_TURN_SUCCESS);
      socket.off(SocketEvents.ON.START_TURN_FAILED);
      socket.off(SocketEvents.ON.SUBMIT_TURN_NOW);
      socket.off(SocketEvents.ON.GET_TURN_RESULT_SUCCESS);
      socket.off(SocketEvents.ON.CONTINUE_TURN);
      socket.off(SocketEvents.ON.END_OF_ROUND);
    };
  }, [currentChoice, setCurrentChoice, setCurrentTurn, socket]);
  return (
    <div className='body-game flex flex-col gap-4 flex-1'>
      <div className='mt-[50px] sm:mt-0 flex justify-center items-center gap-4 relative'>
        <img className='max-w-[320px] sm:max-w-[450px]' src='/games/ban-dau.png' alt='' />
        <CountdownTime initTime={time} />
        <span className='absolute bottom-[45px] sm:bottom-[65px] text-[11px] sm:text-sm flex items-center justify-center w-[80px] sm:w-[100px] font-titan left-[calc(50%-120px)] sm:left-[calc(50%-160px)]'>
          Bạn
        </span>
        <span className='absolute bottom-[45px] sm:bottom-[65px] text-[11px] sm:text-sm flex items-center justify-center w-[80px] sm:w-[100px] font-titan right-[calc(50%-120px)] sm:right-[calc(50%-160px)]'>
          Đối thủ
        </span>
        <span className='absolute bottom-[6px] sm:bottom-[10px] text-[11px] sm:text-sm flex items-center justify-center sm:w-[100px] font-titan left-[50%] translate-x-[-50%]'>
          Turn {currentTurn ?? 1}
        </span>
        <PlayerChoosed position='left' choice={currentChoice ?? ""} />
        <PlayerChoosed position='right' choice={""} />
      </div>
      <ChoiceOption />
    </div>
  );
};
export default BodyGame;