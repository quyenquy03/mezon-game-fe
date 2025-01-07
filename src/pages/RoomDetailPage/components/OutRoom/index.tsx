import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SocketEvents } from "@/constants/SocketEvents";
import { useSocket } from "@/providers/SocketProvider";
import { ROUTES } from "@/routes/path";
import useRoomStore from "@/stores/roomStore";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OutRoom = () => {
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false);
  const navigate = useNavigate();
  const socket = useSocket();
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const currentUser = useUserStore((state) => state.currentUser);
  const handleCancel = () => {
    setOpenModalCreateRoom(false);
  };
  const handleOutRoom = () => {
    if (!socket || !currentUser || !currentRoom) {
      return;
    }
    socket.emit(SocketEvents.EMIT.LEFT_ROOM, {
      roomId: currentRoom?.roomId,
      userId: currentUser.id,
    });
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(SocketEvents.ON.LEFT_ROOM_SUCCESS, () => {
      setOpenModalCreateRoom(false);
      navigate(ROUTES.ROOM);
      setCurrentRoom(null);
    });
    socket.on(SocketEvents.ON.LEFT_ROOM_FAILED, () => {
      console.log("Left room failed");
    });

    return () => {
      socket.off(SocketEvents.ON.LEFT_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.LEFT_ROOM_FAILED);
    };
  }, [navigate, setCurrentRoom, socket]);
  return (
    <Dialog open={openModalCreateRoom} onOpenChange={setOpenModalCreateRoom}>
      <DialogTrigger asChild>
        <div className='text-[35px] p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#59527b85] right-5 bottom-5 cursor-pointer hover:bg-[#321c72db] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all border-2 border-[#9f7b3e]'>
          <img src='/sign.png' alt='room-info' />
        </div>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[350px]'
        aria-describedby='modal-description'
        aria-labelledby='modal-title'
        role='dialog'
      >
        <DialogTitle className='text-center text-[20px] hidden'>Tạo phòng</DialogTitle>
        <div className='min-h-[200px] bg-[#313338] rounded-lg p-2 flex flex-col '>
          <div className='flex justify-center items-center mb-2 p-2 border-b-[1px] border-gray-300'>
            <span>Xác nhận thoát phòng</span>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center'>
            <div className='mb-3 flex justify-center text-center items-center'>
              <span>
                Bạn có chắc chắn <br /> muốn rời khỏi phòng này không?
              </span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <button onClick={handleOutRoom} className='bg-[#f44336] text-white px-4 py-2 rounded-lg'>
                Rời phòng
              </button>
              <button onClick={handleCancel} className='bg-[#4caf50] text-white px-4 py-2 rounded-lg'>
                Ở lại
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OutRoom;
