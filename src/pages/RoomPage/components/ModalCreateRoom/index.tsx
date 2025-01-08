import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SocketEvents } from "@/constants/SocketEvents";
import { AppResponse } from "@/interface/app/AppResponse";
import { RoomInfo } from "@/interface/room/Room";
import { useSocket } from "@/providers/SocketProvider";
import { ROUTES } from "@/routes/path";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
interface IRoomValue {
  roomName: string;
  roomMaxUser: number;
  roomRound: number;
  roomBet: number;
  roomPassword?: string;
  roomUsePassword: boolean;
}
const ModalCreateRoom = () => {
  const [roomValue, setRoomValue] = useState<IRoomValue>({
    roomName: "",
    roomMaxUser: 2,
    roomRound: 3,
    roomBet: 0,
    roomPassword: "",
    roomUsePassword: false,
  });
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();
  const handleChangeSelect = (name: string, value: string) => {
    setRoomValue({ ...roomValue, [name]: value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomValue({ ...roomValue, [name]: value });
  };
  const handleSubmit = () => {
    if (!socket) return;
    console.log("roomValue", roomValue);
    socket.emit(SocketEvents.EMIT.CREATE_ROOM, roomValue);
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(SocketEvents.ON.CREATE_ROOM_SUCCESS, (data: AppResponse<RoomInfo>) => {
      console.log("Create room success", data);
      navigate(ROUTES.ROOM + "/" + data.data?.roomId);
      setOpenModalCreateRoom(false);
    });
    socket.on(SocketEvents.ON.CREATE_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log("Create room failed", data);
    });

    return () => {
      socket.off(SocketEvents.ON.CREATE_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.CREATE_ROOM_FAILED);
    };
  }, [socket]);
  return (
    <div>
      <Dialog open={openModalCreateRoom} onOpenChange={setOpenModalCreateRoom}>
        <DialogTrigger asChild>
          <div className='absolute text-[35px] w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#59527b85] right-5 bottom-5 cursor-pointer hover:bg-[#321c72db] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all border-2 border-[#9f7b3e]'>
            +
          </div>
        </DialogTrigger>
        <DialogContent
          className='sm:max-w-[350px]'
          aria-describedby='modal-description'
          aria-labelledby='modal-title'
          role='dialog'
        >
          <DialogTitle className='text-center text-[20px] hidden'>Tạo phòng</DialogTitle>
          <div className='min-h-[300px] bg-[#313338] rounded-lg p-2'>
            <div className='flex justify-center items-center mb-2 p-2 border-b-[1px] border-gray-300'>
              <span>TẠO PHÒNG</span>
            </div>
            <div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[12px] block w-[120px]'>Tên phòng</span>
                <Input onChange={handleChange} name='roomName' className='flex-1' type='text' placeholder='Nhập tên phòng' />
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[12px] block w-[120px]'>Số người chơi</span>
                <Select defaultValue='2' onValueChange={(e) => handleChangeSelect("roomMaxUser", e)} name='roomMaxUser'>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Chọn số người chơi' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='2'>2 người</SelectItem>
                    <SelectItem value='4'>4 người</SelectItem>
                    <SelectItem value='8'>8 người</SelectItem>
                    <SelectItem value='16'>16 người</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[12px] block w-[120px]'>Số lượt mỗi vòng</span>
                <Select defaultValue='3' onValueChange={(e) => handleChangeSelect("roomRound", e)} name='roomRound'>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Chọn số lượt mỗi vòng' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 lượt chơi</SelectItem>
                    <SelectItem value='3'>3 lượt chơi</SelectItem>
                    <SelectItem value='5'>5 lượt chơi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[12px] block w-[120px]'>Mức cược</span>
                <Input
                  name='roomBet'
                  defaultValue={"1"}
                  onChange={handleChange}
                  className='flex-1'
                  type='number'
                  placeholder='Nhập mức cược'
                />
              </div>
              <div className='mb-3 flex justify-between items-center'>
                <span className='text-[12px] block w-[120px]'>Sử dụng mật khẩu?</span>
                <div className='flex-1 flex items-center gap-2'>
                  <Input
                    disabled={!roomValue?.roomUsePassword}
                    className='flex-1'
                    type='text'
                    name='roomPassword'
                    onChange={handleChange}
                    placeholder='Mật khẩu phòng'
                  />
                  <Input
                    className='w-[20px] h-[20px]'
                    type='checkbox'
                    onChange={(e) => setRoomValue({ ...roomValue, roomUsePassword: e.target.checked })}
                  />
                </div>
              </div>
              <div className='mt-3 pt-2 border-t-[1px] border-white flex justify-between items-center '>
                <Button onClick={handleSubmit} className='w-full'>
                  Tạo phòng
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ModalCreateRoom;
