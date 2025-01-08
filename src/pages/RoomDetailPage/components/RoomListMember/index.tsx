import useRoomStore from "@/stores/roomStore";
import MemberItem from "./MemberItem";

const RoomListMember = () => {
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const listMemberOfRoom = useRoomStore((state) => state.listMemberOfRoom);

  return (
    <div className='flex justify-center items-center flex-wrap gap-2 w-full h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      {Array.from({ length: currentRoom?.roomMaxUser ?? 0 }).map((_, index) => (
        <div className='w-[130px]' key={index}>
          <MemberItem member={listMemberOfRoom !== null ? listMemberOfRoom[index] : undefined} />
        </div>
      ))}
    </div>
  );
};
export default RoomListMember;
