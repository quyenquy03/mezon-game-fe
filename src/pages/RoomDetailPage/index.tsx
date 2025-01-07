import { useNavigate, useParams } from "react-router-dom";
import OutRoom from "./components/OutRoom";
import ShowRoomInfo from "./components/ShowRoomInfo";
import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { SocketEvents } from "@/constants/SocketEvents";
import useUserStore from "@/stores/userStore";
import { RoomInfo } from "@/interface/room/Room";
import { AppResponse } from "@/interface/app/AppResponse";
import useRoomStore from "@/stores/roomStore";
import RoomListMember from "./components/RoomListMember";
import { ROUTES } from "@/routes/path";
import { User } from "@/interface/user/User";

const RoomDetailPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  const setMemberOfRoom = useRoomStore((state) => state.setListMemberOfRoom);
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const socket = useSocket();

  const handleStartGame = () => {
    if (!socket) {
      return;
    }
    if (!currentUser.id) {
      return;
    }
    if (!roomId) {
      return;
    }
    socket.emit(SocketEvents.EMIT.CHECK_BEFORE_START_GAME, {
      roomId,
      userId: currentUser.id,
    });
  };
  useEffect(() => {
    if (!roomId) {
      console.log("Room ID is not found");
      return;
    }
    if (!currentUser?.id) {
      return;
    }
    if (!socket) {
      return;
    }
    socket.emit(SocketEvents.EMIT.JOIN_ROOM, {
      roomId,
      userId: currentUser.id,
    });
    socket.on(SocketEvents.ON.JOIN_ROOM_SUCCESS, (data: AppResponse<RoomInfo>) => {
      setCurrentRoom(data.data ?? null);
    });
    socket.on(SocketEvents.ON.JOIN_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log(data.errorMessage);
      navigate(ROUTES.ROOM);
    });
    socket.on(SocketEvents.ON.GET_MEMBER_OF_ROOM_SUCCESS, (data: AppResponse<User[]>) => {
      setMemberOfRoom(data.data ?? []);
    });
    socket.on(SocketEvents.ON.START_NEW_GAME_SUCCESS, (data: AppResponse<{ gameId: string; roomId: string }>) => {
      console.log("Start new game success", data);
      navigate(ROUTES.GAME.replace(":roomId", data.data?.roomId ?? "").replace(":gameId", data.data?.gameId ?? ""));
    });
    socket.on(SocketEvents.ON.START_NEW_GAME_FAILED, (data: AppResponse<null>) => {
      console.log("Start new game failed", data);
    });
    socket.on(SocketEvents.ON.CHECK_BEFORE_START_GAME_FAILED, (data: AppResponse<null>) => {
      console.log("Check before start game failed", data);
    });

    return () => {
      if (socket) {
        socket.off(SocketEvents.ON.JOIN_ROOM_SUCCESS);
        socket.off(SocketEvents.ON.JOIN_ROOM_FAILED);
        socket.off(SocketEvents.ON.GET_MEMBER_OF_ROOM_SUCCESS);
        socket.off(SocketEvents.ON.START_NEW_GAME_SUCCESS);
        socket.off(SocketEvents.ON.START_NEW_GAME_FAILED);
        socket.off(SocketEvents.ON.CHECK_BEFORE_START_GAME_FAILED);
      }
    };
  }, [roomId, socket, currentUser.id, navigate, setCurrentRoom, setMemberOfRoom]);
  return (
    <div className='room-detail-page flex flex-col gap-4 h-full'>
      <div className='header flex justify-between gap-2 h-[70px] w-full'>
        <OutRoom />
        <div className='w-[200px] flex justify-center items-center relative'>
          <img className='w-full' src='/room-top.png' alt='' />
          <span className='absolute flex items-center justify-center w-full h-full font-bold text-[20px] mt-2'>
            {currentRoom?.roomId}
          </span>
        </div>
        <ShowRoomInfo />
      </div>
      <div className='body flex-1'>
        <div className='list-member min-h-[200px] flex items-center w-full'>
          <RoomListMember />
        </div>
      </div>
      <div className='text-center flex items-center justify-center gap-4 mt-4'>
        <button
          onClick={handleStartGame}
          className='w-[80px] h-[80px] p-3 rounded-full bg-[#676767ba] hover:bg-[#353535c9] shadow-inner shadow-gray-400 text-white font-bold text-[20px] flex items-center justify-center active:scale-[0.98] transition-all'
        >
          <img className='w-full' src='/swords.png' alt='leave-room' />
        </button>
      </div>
    </div>
  );
};
export default RoomDetailPage;
