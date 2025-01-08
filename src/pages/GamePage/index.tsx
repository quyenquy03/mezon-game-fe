import { useNavigate, useParams } from "react-router-dom";
import BodyGame from "./components/BodyGame";
import HeaderGame from "./components/HeaderGame";
import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { SocketEvents } from "@/constants/SocketEvents";
import useUserStore from "@/stores/userStore";
import { AppResponse } from "@/interface/app/AppResponse";
import { CurrentRoundInfo, ICombineNextRoundSubmitData, IEndGameDTO, StartTurnSubmit } from "@/interface/game/Game";
import useGameStore from "@/stores/gameStore";
import { ROUTES } from "@/routes/path";
import EndGameResult from "../RoomDetailPage/components/EndGameResult";

const GamePage = () => {
  const { gameId, roomId } = useParams();
  const socket = useSocket();
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentRoundInfo = useGameStore((state) => state.setCurrentRoundInfo);
  const setCurrentRound = useGameStore((state) => state.setCurrentRound);
  const setGameResult = useGameStore((state) => state.setGameResult);
  const setIsShowGameResult = useGameStore((state) => state.setIsShowGameResult);
  const setRoundResult = useGameStore((state) => state.setRoundResult);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket || !gameId || !currentUser?.id) return;
    socket.emit(SocketEvents.EMIT.START_ROUND, {
      roomId,
      gameId,
      userId: currentUser.id,
      currentRound: 1,
    });
    socket.on(SocketEvents.ON.START_ROUND_SUCCESS, (data: AppResponse<CurrentRoundInfo>) => {
      console.log("Start round success", data.data);
      setCurrentRoundInfo(data.data as CurrentRoundInfo);
      setCurrentRound((data.data?.currentRound as number) ?? 1);
      setRoundResult([]);
      const startTurnSubmit: StartTurnSubmit = {
        roomId: roomId as string,
        gameId,
        userId: currentUser.id as string,
        currentRound: data.data?.currentRound as number,
        roundId: data.data?.roundId as string,
        currentTurn: 1,
      };
      socket.emit(SocketEvents.EMIT.START_TURN, startTurnSubmit);
    });
    socket.on(SocketEvents.ON.START_ROUND_FAILED, (data: AppResponse<null>) => {
      setCurrentRoundInfo(null);
      console.log(data.errorMessage);
    });
    socket.on(SocketEvents.ON.CONTINUE_JOIN_GAME_SUCCESS, (data: AppResponse<CurrentRoundInfo>) => {
      const combineNextRoundData: ICombineNextRoundSubmitData = {
        roomId: roomId as string,
        gameId,
        userId: currentUser.id as string,
        currentRound: data.data?.currentRound as number,
        roundId: data.data?.roundId as string,
      };
      socket.emit(SocketEvents.EMIT.COMBINE_NEXT_ROUND, combineNextRoundData);
    });
    socket.on(SocketEvents.ON.CONTINUE_JOIN_GAME_FAILED, (data: AppResponse<null>) => {
      console.log("Continue join game fail", data.errorMessage);
    });
    socket.on(SocketEvents.ON.COMBINE_NEXT_ROUND_SUCCESS, (data: AppResponse<CurrentRoundInfo>) => {
      const startRoundData = {
        roomId: roomId as string,
        gameId,
        userId: currentUser.id as string,
        currentRound: data.data?.currentRound as number,
      };
      console.log("Combine next round success", data.data);
      console.log("start round =======");
      socket.emit(SocketEvents.EMIT.START_ROUND, startRoundData);
    });
    socket.on(SocketEvents.ON.COMBINE_NEXT_ROUND_FAILED, (data: AppResponse<null>) => {
      console.log("Combine next round fail", data);
    });
    socket.on(SocketEvents.ON.END_OF_GAME, (data: AppResponse<IEndGameDTO>) => {
      setGameResult(data.data as IEndGameDTO);
      setIsShowGameResult(true);
      console.log("End of game", data.data);
      setTimeout(() => {
        setIsShowGameResult(false);
        navigate(ROUTES.ROOM_DETAIL.replace(":roomId", roomId as string));
      }, 10000);
    });

    return () => {
      socket.off(SocketEvents.ON.START_ROUND_SUCCESS);
      socket.off(SocketEvents.ON.START_ROUND_FAILED);
      socket.off(SocketEvents.ON.CONTINUE_JOIN_GAME_SUCCESS);
      socket.off(SocketEvents.ON.CONTINUE_JOIN_GAME_FAILED);
      socket.off(SocketEvents.ON.COMBINE_NEXT_ROUND_SUCCESS);
      socket.off(SocketEvents.ON.COMBINE_NEXT_ROUND_FAILED);
      socket.off(SocketEvents.ON.END_OF_GAME);
    };
  }, [
    currentUser.id,
    gameId,
    navigate,
    roomId,
    setCurrentRound,
    setCurrentRoundInfo,
    setGameResult,
    setIsShowGameResult,
    socket,
  ]);
  return (
    <div className='h-full w-full flex flex-col '>
      <HeaderGame />
      <BodyGame />
      <EndGameResult />
    </div>
  );
};
export default GamePage;
