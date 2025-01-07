import { SocketEvents } from "@/constants/SocketEvents";
import { User } from "@/interface/user/User";
import { useSocket } from "@/providers/SocketProvider";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

const UserInfomation = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(SocketEvents.ON.USER_VISIT_GAME_SUCCESS, (data: User) => {
      console.log("User visit game success", data);
    });
  }, [currentUser.id, socket]);
  return (
    <div className='userbox flex '>
      <Dialog>
        <DialogTrigger asChild>
          <div className='user-avatar w-[50px] h-[50px] relative cursor-pointer'>
            <img className='w-full' src='/user-avatar.png' />
            {/* <img className='w-[20px] h-[20px] absolute right-0 bottom-0' src={currentUser?.avatar} /> */}
          </div>
        </DialogTrigger>
        <DialogContent
          className='sm:max-w-[400px]'
          aria-describedby='modal-description'
          aria-labelledby='modal-title'
          role='dialog'
        >
          <DialogTitle className='text-center text-[20px] hidden'>Thông tin người chơi</DialogTitle>
          <div className='min-h-[200px] bg-[#313338] rounded-lg p-2'>
            <div className='flex justify-center items-center mb-2 p-2 border-b-[1px] border-gray-300'>
              <span>Thông tin người chơi</span>
            </div>
            <div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[14px] block w-[120px]'>Tên người chơi</span>
                <span className='flex-1 text-[14px]'>{currentUser?.name}</span>
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[14px] block w-[120px]'>Tên tài khoản</span>
                <span className='flex-1 text-[14px]'>{currentUser?.username}</span>
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[14px] block w-[120px]'>Email</span>
                <span className='flex-1 text-[14px]'>{currentUser?.email}</span>
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[14px] block w-[120px]'>Số dư</span>
                <span className='flex-1 text-[14px]'>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentUser?.wallet ?? 0)}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <div className='pl-2 flex-1 select-none'>
        <div className='min-w-[150px] h-[24px] mt-3 relative rounded-lg flex items-center border-2 border-[#8a99b9] bg-[#5b2a0eed]'>
          <div className='coin absolute left-[-4px] top-[-4px] flex items-center'>
            <img className='w-[30px] h-[30px]' src='/coin.png' />
          </div>
          <div className='coin-text flex-1 px-[30px] h-[24px] leading-none text-[12px] flex items-center'>1000</div>
          <div className='icon absolute right-[-2px] top-[-6px]  w-[32px] h-[32px] rounded-lg flex items-center justify-center cursor-pointer text-lg bg-[#34495f]'>
            +
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default UserInfomation;
