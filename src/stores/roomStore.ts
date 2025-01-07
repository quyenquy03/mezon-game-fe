// stores/counterStore.ts
import { RoomInfo } from "@/interface/room/Room";
import { User } from "@/interface/user/User";
import { create } from "zustand";

interface RoomState {
  listRoom: RoomInfo[];
  currentRoom: RoomInfo | null;
  listMemberOfRoom: User[] | null;

  // Function
  setListRoom: (rooms: RoomInfo[]) => void;
  setCurrentRoom: (room: RoomInfo | null) => void;
  setListMemberOfRoom: (members: User[] | null) => void;
  addRoom: (room: RoomInfo) => void;
}

const useRoomStore = create<RoomState>((set) => ({
  listRoom: [],
  currentRoom: null,
  listMemberOfRoom: null,
  // Function

  setListRoom: (rooms) => set({ listRoom: rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  addRoom: (room) => set((state) => ({ listRoom: [...state.listRoom, room] })),
  setListMemberOfRoom: (members) => set({ listMemberOfRoom: members }),
}));

export default useRoomStore;
