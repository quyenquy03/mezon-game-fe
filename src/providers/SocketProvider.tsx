import { SocketEvents } from "@/constants/SocketEvents";
import useUserStore from "@/stores/userStore";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketContext = createContext<any>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  useEffect(() => {
    if (currentUser.id) {
      socket.current = io("http://localhost:5100", {
        withCredentials: true,
        query: {
          userId: currentUser.id,
        },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket");
        socket.current?.emit(SocketEvents.EMIT.USER_VISIT_GAME, currentUser);
      });
      socket.current.on(SocketEvents.ON.USER_CONNECTED, () => {
        setCurrentUser({
          ...currentUser,
          isConnected: true,
        });
      });
      return () => {
        socket.current?.disconnect();
      };
    }
  }, [currentUser.id]);

  return <SocketContext.Provider value={socket?.current}>{children}</SocketContext.Provider>;
};
