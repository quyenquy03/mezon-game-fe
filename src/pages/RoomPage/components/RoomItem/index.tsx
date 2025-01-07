import { SocketEvents } from "@/constants/SocketEvents";
import { RoomInfo } from "@/interface/room/Room";
import { useSocket } from "@/providers/SocketProvider";
import useUserStore from "@/stores/userStore";
interface IRoomItemProps {
  // Props type definition
  roomItem: RoomInfo;
}
const RoomItem = ({ roomItem }: IRoomItemProps) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const socket = useSocket();
  const handleJoinGame = () => {
    // Handle join game
    if (!socket) {
      return;
    }
    if (!currentUser.id) {
      return;
    }
    console.log("check room before join", roomItem.roomId);
    socket.emit(SocketEvents.EMIT.CHECK_ROOM_BEFORE_JOIN, {
      roomId: roomItem.roomId,
      userId: currentUser.id,
    });
  };

  return (
    <div className='flex justify-center items-center w-full mt-3'>
      <div className='relative w-[280px] flex justify-center items-center select-none'>
        <img className='select-none w-full h-full' src='/room.png' />
        <span className='absolute top-[75px] flex justify-center items-center w-[100px] font-bold'>{roomItem.roomId}</span>
        <span
          onClick={handleJoinGame}
          className='absolute font-titan bottom-[12px] flex justify-center items-center w-[100px] cursor-pointer font-bold'
        >
          VÀO
        </span>
      </div>
    </div>
  );
};
export default RoomItem;
