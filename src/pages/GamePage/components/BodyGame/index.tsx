import { useSocket } from "@/providers/SocketProvider";
import ChoiceOption from "./ChoiceOption";
import CountdownTime from "./CountdownTime";
import { useEffect, useMemo, useState } from "react";
import { SocketEvents } from "@/constants/SocketEvents";
import { ContinueJoinGameSubmitData, EndRoundData, ITurnResult, StartTurnSubmit, SubmitTurnData } from "@/interface/game/Game";
import { AppResponse } from "@/interface/app/AppResponse";
import useGameStore from "@/stores/gameStore";
import PlayerChoosed from "./PlayerChoosed";
import useUserStore from "@/stores/userStore";

const BodyGame = () => {
  const socket = useSocket();
  const currentUser = useUserStore((state) => state.currentUser);
  const currentChoice = useGameStore((state) => state.currentChoice);
  const currentTurn = useGameStore((state) => state.currentTurn);
  const roundResult = useGameStore((state) => state.roundResult);
  const currentTurnResult = useGameStore((state) => state.currentTurnResult);
  const setCurrentChoice = useGameStore((state) => state.setCurrentChoice);
  const setCurrentTurn = useGameStore((state) => state.setCurrentTurn);
  const setCurrentTurnResult = useGameStore((state) => state.setCurrentTurnResult);
  const setRoundResult = useGameStore((state) => state.setRoundResult);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!socket) return;
    socket.on(SocketEvents.ON.START_TURN_SUCCESS, (data: AppResponse<StartTurnSubmit>) => {
      setCurrentChoice(null);
      setCurrentTurn(data.data?.currentTurn as number);
      setCurrentTurnResult(null);
      setTime(10);
    });
    socket.on(SocketEvents.ON.START_TURN_FAILED, (data: AppResponse<null>) => {
      setTime(0);
      console.log(data.errorMessage);
    });
    socket.on(SocketEvents.ON.SUBMIT_TURN_NOW, (data: AppResponse<StartTurnSubmit>) => {
      const submitTurn: SubmitTurnData = {
        roomId: data.data?.roomId as string,
        userId: data.data?.userId as string,
        gameId: data.data?.gameId as string,
        roundId: data.data?.roundId as string,
        currentRound: data.data?.currentRound as number,
        currentTurn: data.data?.currentTurn as number,
        choice: currentChoice as string,
      };
      socket.emit(SocketEvents.EMIT.SUBMIT_TURN, submitTurn);
      setTimeout(() => {
        socket.emit(SocketEvents.EMIT.GET_TURN_RESULT, submitTurn);
      }, 1000);
    });
    socket.on(SocketEvents.ON.GET_TURN_RESULT_SUCCESS, (data: AppResponse<ITurnResult>) => {
      const currentTurnData = data.data as ITurnResult;
      setCurrentTurnResult(currentTurnData);
      setRoundResult([...roundResult, currentTurnData.winner]);
      setTime(5);
    });
    socket.on(SocketEvents.ON.CONTINUE_TURN, (data: AppResponse<StartTurnSubmit>) => {
      socket.emit(SocketEvents.EMIT.START_TURN, data.data as StartTurnSubmit);
    });
    socket.on(SocketEvents.ON.END_OF_ROUND, (data: AppResponse<EndRoundData>) => {
      if (data.data?.isWinner) {
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
  }, [currentChoice, roundResult, setCurrentChoice, setCurrentTurn, setCurrentTurnResult, setRoundResult, socket]);
  const status = useMemo(() => {
    if (!currentTurnResult) {
      return;
    }
    if (currentTurnResult.winner === currentUser.id) return "win";
    if (currentTurnResult.winner === null) return "draw";
    return "lose";
  }, [currentTurnResult, currentUser.id]);
  return (
    <div className='body-game flex flex-col gap-4 flex-1'>
      <div className='mt-[50px] sm:mt-0 flex justify-center items-center gap-4 relative'>
        {currentTurnResult !== null && (
          <span
            style={{ animationDuration: ".5s" }}
            className={`${
              status === "win" ? "text-green-500" : status === "draw" ? "text-yellow-500" : "text-red-500"
            } animate-pulse font-titan d-block w-[300px] text-center text-[16px] z-10 sm:text-[20px] absolute top-[24px] sm:top-[38px] left-[calc(50%-150px)] sm:left-[calc(50%-150px)]`}
          >
            {status === "win" ? "Bạn thắng" : status === "draw" ? "Hòa nhau" : "Bạn thua"}
          </span>
        )}
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
        <PlayerChoosed position='right' choice={currentTurnResult?.rivalChoice ?? ""} />
      </div>
      <ChoiceOption />
    </div>
  );
};
export default BodyGame;
