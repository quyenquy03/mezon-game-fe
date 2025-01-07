import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ListRoomHeader from "../ListRoomHeader";
import RoomItem from "../RoomItem";
import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { SocketEvents } from "@/constants/SocketEvents";
import { AppResponse } from "@/interface/app/AppResponse";
import { RoomInfo } from "@/interface/room/Room";
import useRoomStore from "@/stores/roomStore";

import { ROUTES } from "@/routes/path";
import { useNavigate } from "react-router-dom";

const ListRoom = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const setListRoom = useRoomStore((state) => state.setListRoom);
  const ListRoom = useRoomStore((state) => state.listRoom);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit(SocketEvents.EMIT.GET_LIST_ROOMS);
    socket.on(SocketEvents.ON.GET_LIST_ROOMS_SUCCESS, (data: AppResponse<RoomInfo[]>) => {
      setListRoom(data?.data ?? []);
    });
    socket.on(SocketEvents.ON.CHECK_ROOM_BEFORE_JOIN_SUCCESS, (data: AppResponse<RoomInfo>) => {
      navigate(ROUTES.ROOM_DETAIL.replace(":roomId", data.data?.roomId ?? ""));
    });
    socket.on(SocketEvents.ON.CHECK_ROOM_BEFORE_JOIN_FAILED, (data: AppResponse<null>) => {
      alert(data.errorMessage);
    });
    return () => {
      if (socket) {
        socket.off(SocketEvents.ON.GET_LIST_ROOMS_SUCCESS);
        socket.off(SocketEvents.ON.CHECK_ROOM_BEFORE_JOIN_SUCCESS);
        socket.off(SocketEvents.ON.CHECK_ROOM_BEFORE_JOIN_FAILED);
      }
    };
  }, [navigate, setListRoom, socket]);

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <ListRoomHeader />
      <Carousel className='w-[calc(100%-100px)] flex-1'>
        <CarouselContent className=''>
          {ListRoom?.map((room) => {
            return (
              <CarouselItem className='md:basis-1/2' key={room.roomId}>
                <RoomItem roomItem={room} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default ListRoom;
