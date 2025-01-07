import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useRoomStore from "@/stores/roomStore";
import { useState } from "react";

const ShowRoomInfo = () => {
  const currentRoom = useRoomStore((state) => state.currentRoom);
  console.log(currentRoom);
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false);
  return (
    <Dialog open={openModalCreateRoom} onOpenChange={setOpenModalCreateRoom}>
      <DialogTrigger asChild>
        <div className='text-[35px] p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#59527b85] right-5 bottom-5 cursor-pointer hover:bg-[#321c72db] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all border-2 border-[#9f7b3e]'>
          <img src='/info.png' alt='room-info' />
        </div>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[350px]'
        aria-describedby='modal-description'
        aria-labelledby='modal-title'
        role='dialog'
      >
        <DialogTitle className='text-center text-[20px] hidden'>Tạo phòng</DialogTitle>
        <div className=' bg-[#313338] rounded-lg p-2'>
          <div className='flex justify-center items-center mb-2 p-2 border-b-[1px] border-gray-300'>
            <span>Thông tin phòng đấu</span>
          </div>
          <div>
            <div className='mb-3 flex justify-between items-center'>
              <span className='text-[14px] block w-[120px]'>Mã phòng</span>
              <span className='flex-1 text-[14px] text-end'>{currentRoom?.roomId}</span>
            </div>
            <div className='mb-3 flex justify-between items-center'>
              <span className='text-[14px] block w-[120px]'>Tên phòng</span>
              <span className='flex-1 text-[14px] text-end'>{currentRoom?.roomName}</span>
            </div>
            <div className='mb-3 flex justify-between items-center'>
              <span className='text-[14px] block w-[120px]'>Số người chơi</span>
              <span className='flex-1 text-[14px] text-end'>{currentRoom?.roomMaxUser}</span>
            </div>
            <div className='mb-3 flex justify-between items-center'>
              <span className='text-[14px] block w-[120px]'>Mức cược</span>
              <span className='flex-1 text-[14px] text-end'>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentRoom?.roomBet ?? 0)}
              </span>
            </div>
            <div className='mb-3 flex justify-between items-center'>
              <span className='text-[14px] block w-[120px]'>Mật khẩu phòng</span>
              <span className='flex-1 text-[14px] text-end'>Không dùng mật khẩu</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShowRoomInfo;
